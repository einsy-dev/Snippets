import fs from "fs";
import * as prettier from "prettier";
import { ConfigI, FilesI, SnippetsI } from "../shared/interface";
import { convertFiles } from "./compileTS/convertFiles";
import { parseFiles } from "./genSnippets/parseFiles";
import { getFiles } from "./getFiles/getFiles";
import { extention } from "../templates";
import { languages } from "./languages";

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
  for (const ext in snippets) {
    fs.writeFileSync(
      `${options.outDir}/${ext}.code-snippets`,
      await prettier.format(JSON.stringify(snippets[ext]), { parser: "json", printWidth: 50 }),
      "utf8"
    );
    extention.contributes.snippets.push({
      language: languages[ext] || ext,
      path: `./${ext}.code-snippets`
    });
  }
  if (options.extention) {
    fs.writeFileSync(`${options.outDir}/package.json`, await prettier.format(JSON.stringify(extention), { parser: "json", printWidth: 50 }), "utf8");
  }
}

function getExtention(fileName: string): string {
  let name = fileName.split(".");
  return name[name.length - 1];
}
