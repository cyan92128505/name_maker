import fs from "fs-extra";
import path from "path";

async function loadRaw(dataId) {
  return await fs.readFile(path.join(process.cwd(), `raw_${dataId}`), {
    encoding: "utf8",
  });
}

function replaceText(data) {
  var result = `${data}`;

  result = result.replace(/<(|\/)table>/gi, "");
  result = result.replace(/<(|\/)thead>/gi, "");
  result = result.replace(/<(|\/)tr>/gi, "");
  result = result.replace(/^\s*$(?:\r\n?|\n)/gm, "");
  result = result.replace(
    /<td colspan="3"><span style="font-size: 18pt;"><strong>✓ 總筆劃[0-9]+劃 部首『/gm,
    '{}]},{"name":"'
  );

  result = result.replace(/』部｡<\/strong><\/span><\/td>/gi, '",');
  result = result.replace(
    /<td colspan="3" width="400px">⚠️ 生肖『<strong>/gi,
    '"animal":"'
  );

  result = result.replace(
    /』<\/strong>需審核慎用 \(少用\)｡<\/td>/gi,
    '", "list": ['
  );
  result = result.replace(
    /<td colspan="3" width="400px">◎ 此部首生肖皆適用吉｡<\/td>/gm,
    '"animal":"", "list": ['
  );

  result = result.replace(/<td width="60px">　•/gm, '{ "text": "');
  result = result.replace(/<td width="70px">/gm, '"sound": "');
  result = result.replace(
    /<td>(|⚠️生肖『.+』需審核慎用 \(少用\)｡)《/gm,
    '"type": "'
  );
  result = result.replace(/》<\/td>/gm, '"},');
  result = result.replace(/<\/td>/gm, '",');

  result = `[{"list":[${result}{}]}]`;
  return result;
}

async function saveFile(data, id) {
  await fs.writeJSON(
    path.join(process.cwd(), `word_${id}.json`),
    JSON.parse(data),
    {
      spaces: 4,
    }
  );
}

async function processByID(id) {
  let rawData = await loadRaw(id);
  let data = replaceText(rawData);
  saveFile(data, id);
}

async function main() {
  await processByID("3");
  await processByID("4");
  await processByID("6");
  await processByID("9");
  await processByID("11");
  await processByID("14");
  await processByID("19");
}

main();
