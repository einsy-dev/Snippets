import fs from "fs";
import { ConfigI, FilesI, SnippetsI } from "../shared/interface";
import { convertFiles } from "./compileTS/convertFiles";
import { parseFiles } from "./genSnippets/parseFiles";
import { getFiles } from "./getFiles/getFiles";

export async function snipgen(path: string, options: ConfigI) {
  let files: FilesI = getFiles(path, {}, getExtention);
  if (options.clean && fs.existsSync(options.outDir)) {
    fs.rmSync(options.outDir, { recursive: true, force: true });
  }
  if (!fs.existsSync(options.outDir)) {
    fs.mkdirSync(options.outDir);
  }
  if (options.tsc) {
    await convertFiles(files);
  }
  let snippets: SnippetsI = parseFiles(files);
  for (const language in snippets) {
    fs.writeFileSync(`${options.outDir}/${language}.code-snippets`, JSON.stringify(snippets[language]), "utf8");
  }
}

function getExtention(fileName: string): string {
  let name = fileName.split(".");
  return name[name.length - 1];
}
