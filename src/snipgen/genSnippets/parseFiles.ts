import { FilesI, SnippetsI } from "../../shared/interface";
import fs from "fs";

export function parseFiles(files: FilesI): SnippetsI {
  let snippets: SnippetsI = {};

  for (const ext in files) {
    // el = "js" | "jsx" | "ts" | "tsx" ...
    if (!snippets[ext]) snippets[ext] = {};
    for (const el of files[ext]) {
      // el = { name: "index.js", path: "./index.js" }
      
      let fileName = el.name.split(".");
      
      if (fileName.length < 3) throw new Error(`Invalid file name ${el.name}`);
      
      let [prefix, name] = [fileName[0], fileName.slice(1, -1).join(".")];
      
      snippets[ext][name] = {
        prefix,
        body: fs.readFileSync(el.path, "utf8").split("\n")
      };
    }
  }
  return snippets;
}
