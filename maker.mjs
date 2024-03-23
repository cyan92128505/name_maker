import fs from "fs-extra";
import path from "path";

class Wuxing {
  metal = 0;
  wood = 0;
  water = 0;
  fire = 0;
  earth = 0;

  addCount(rawString) {
    if (rawString === "金") {
      this.metal = this.metal + 1;
    }
    if (rawString === "木") {
      this.wood = this.wood + 1;
    }
    if (rawString === "水") {
      this.water = this.water + 1;
    }
    if (rawString === "火") {
      this.fire = this.fire + 1;
    }
    if (rawString === "土") {
      this.earth = this.earth + 1;
    }
  }
}

class TextItem {
  text;
  sound;
  type;
  wuxing;
  /**
   *
   * @param {String} text
   * @param {String} sound
   * @param {String} type
   */
  constructor(text, sound, type) {
    this.text = text;
    this.sound = sound;
    this.type = type;
    this.wuxing = prepareTypeRate(this.type);
  }
}

class TextDatabase {
  name;
  animal;
  list;

  /**
   *
   * @param {String} name
   * @param {String} animal
   * @param {Array<TextItem>} list
   */
  constructor(name, animal, list) {
    this.name = name;
    this.animal = animal;
    this.list = list;
  }
}

/**
 *
 * @param {TextDatabase} data
 * @param {String} animal
 *
 * @returns {Array<TextItem>}
 */
function getTextList(data, animal) {
  if (data.animal != null && data.animal.includes(animal)) {
    return [];
  }

  return data.list;
}

/**
 *
 * @param {Array<TextDatabase>} textSet
 * @param {String} animal
 *
 * @returns {Array<TextItem>}
 */
function prepareAllText(textSet, animal) {
  return textSet
    .map((a) => getTextList(a, animal))
    .reduce((a, b) => a.concat(b))
    .filter((t) => t.text != null);
}

/**
 *
 * @param {String} typeStrings
 *
 * @returns {Wuxing}
 */
function prepareTypeRate(typeStrings) {
  let list = typeStrings.split("");
  let wuxing = new Wuxing();
  for (const iterator of list) {
    wuxing.addCount(iterator);
  }

  return wuxing;
}

async function main() {
  const animal = "龍";
  const lastName = new TextItem("廖", "ㄌㄧㄠˋ", "火金土土");
  // const fristName2 = new TextItem("帆", "ㄈㄢˊ", "水土木");
  const fristName2 = new TextItem("允", "ㄩㄣˇ", "水土水");
  // const fristName2 = new TextItem("睿", "ㄖㄨㄟˋ", "金水土木");

  // let word19DatabaseSet = await fs.readJson(
  //   path.join(process.cwd(), "word_19.json")
  // );
  // let word14DatabaseSet = await fs.readJson(
  //   path.join(process.cwd(), "word_14.json")
  // );
  let middleDatabaseSet = await fs.readJson(
    path.join(process.cwd(), "word_19.json")
  );
  // let list19 = prepareAllText(word19DatabaseSet, animal);
  // let list14 = prepareAllText(word14DatabaseSet, animal).filter(
  //   (a) => a.text !== lastName.text
  // );
  let listMiddle = prepareAllText(middleDatabaseSet, animal);

  let list = [];

  // for (let j = 0; j < list19.length; j++) {
  //   const text19 = list19[j];

  //   for (let i = 0; i < list14.length; i++) {
  //     const text14 = list14[i];

  //     list.push(
  //       new TextItem(
  //         lastName.text + text19.text + text14.text,
  //         `${lastName.sound} ${text19.sound} ${text14.sound}`,
  //         lastName.type + text19.type + text14.type
  //       )
  //     );
  //   }
  // }

  for (let j = 0; j < listMiddle.length; j++) {
    const textMiddle = listMiddle[j];

    list.push(
      new TextItem(
        lastName.text + textMiddle.text + fristName2.text,
        `${lastName.sound} ${textMiddle.sound} ${fristName2.sound}`,
        lastName.type + textMiddle.type + fristName2.type
      )
    );
  }

  // list = list.filter((t) => {
  //   return (
  //     t.wuxing.water >= 4
  //   );
  // });

  list = list.map((t) => {
    return `${t.text},${t.sound},${t.wuxing.metal},${t.wuxing.wood},${t.wuxing.water},${t.wuxing.fire},${t.wuxing.earth}`;
  });

  let result = "name,sound,metal,wood,water,fire,earth\n" + list.join("\n");

  await fs.writeFile(path.join(process.cwd(), "result.csv"), result);
}

main();
