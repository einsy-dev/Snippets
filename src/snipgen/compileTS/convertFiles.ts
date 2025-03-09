import { transformFile } from "detype";
import { FilesI } from "../../shared/interface";

export async function convertFiles(files: FilesI): Promise<void> {
  if (!files["ts"] && !files["tsx"]) return;
  await transorm(files, "ts", "js");
  await transorm(files, "tsx", "jsx");
}

async function transorm(files: FilesI, from: string, to: string): Promise<void> {
  if (!files[from]) return;
  for (const el of files[from]) {
    let newEl = {
      name: el.name.replace(from, to),
      path: el.path.replace(from, to)
    };
    await transformFile(el.path, newEl.path);
    if (!Array.isArray(files[to])) files[to] = [];

    if (files[to].find((el) => el.path === newEl.path)) continue;

    files[to].push(newEl);
  }
}
