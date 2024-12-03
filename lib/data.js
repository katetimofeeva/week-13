import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

export function getSortedList() {
  const filePath = path.join(dataDir, "people.json");
  const jsonStr = fs.readFileSync(filePath, "utf8");

  const dataObj = JSON.parse(jsonStr);
  dataObj.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  return dataObj.map(({ id, name }) => ({ id: id.toString(), name }));
}

export function getAllIds() {
  const filePath = path.join(dataDir, "people.json");
  const jsonStr = fs.readFileSync(filePath, "utf8");

  const dataObj = JSON.parse(jsonStr);
  return dataObj.map(({ id }) => {
    return {
      params: {
        id: id.toString(),
      },
    };
  });
}

export function getPerson(id) {
  const filePath = path.join(dataDir, "people.json");
  const jsonStr = fs.readFileSync(filePath, "utf8");

  const dataObj = JSON.parse(jsonStr);

  const foundPerson = dataObj.filter(item => item.id.toString() === id);

  if (foundPerson.length) {
    return foundPerson[0];
  } else {
    return {};
  }
}
