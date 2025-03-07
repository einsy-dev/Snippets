import fs from "fs";
import { FilesI } from "../../shared/interface";

export function getFiles(dir: string, files: FilesI, fn: (dir: string) => string): FilesI {
  let content = fs.readdirSync(dir);
  for (const el of content) {
    if (fs.lstatSync(`${dir}/${el}`).isDirectory()) {
      getFiles(`${dir}/${el}`, files, fn);
    } else {
      if (!files[fn(el)]) files[fn(el)] = [];
      files[fn(el)].push({ name: el, path: `${dir}/${el}` });
    }
  }
  return files;
}
