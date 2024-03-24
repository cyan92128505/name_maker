import fs from "fs-extra";
import path from "path";
import { curly } from "node-libcurl";
import { parseFromString } from "dom-parser";
import dotenv from "dotenv";
dotenv.config();

const urls = [
  "/name-rename/name-and-glossology/7479-03-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7290-04-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7289-05-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7288-06-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7287-07-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7286-08-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7285-09-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7284-10-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7283-11-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7282-12-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7275-13-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7279-14-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7291-15-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7292-16-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7293-17-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7294-18-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7295-19-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7296-20-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7297-21-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7298-22-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7299-23-strokes-of-kangxi-dictionary.html",
  "/name-rename/name-and-glossology/7300-24-strokes-of-kangxi-dictionary.html",
];

async function openPage(url) {
  const fileName = "raw_" + `${url}`.split("/").reverse()[0].split("-")[1];
  console.log(fileName);
  const { data } = await curly.get(url);
  const dom = parseFromString(data);

  const tableNode = dom.getElementsByTagName("table");

  await fs.writeFile(
    path.join(process.cwd(), fileName),
    tableNode[1].innerHTML
  );
}

async function main() {
  for (const url of urls) {
    await openPage(process.env.DATAURL + url);
  }
}

main();
