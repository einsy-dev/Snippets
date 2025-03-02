import * as fs from "fs";

interface configI {
  clean?: boolean;
  path?: string;
  outDir?: string;
}

const defaultConfig: configI = {
  clean: true,
  path: "./src",
  outDir: "./dist"
};

function main(config: configI = {}) {
  config = Object.assign(config, defaultConfig);
  const { path, outDir, clean } = config;
  if (!path || !outDir || clean === undefined) throw new Error("Invalid config");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  if (!fs.existsSync(path)) {
    throw new Error("Path does not exist");
  }
  if (clean && fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
    fs.mkdirSync(outDir, { recursive: true });
  }
  const snippets = getSnippetsFromFolder(path);
  for (const language in snippets) {
    fs.writeFileSync(`${outDir}/${language}.code-snippets`, JSON.stringify(snippets[language]), "utf8");
  }
}

function getSnippetsFromFolder(folderPath: string, snippets: any = {}): any {
  const folderContents = fs.readdirSync(folderPath);
  for (const el of folderContents) {
    const filePath = `${folderPath}/${el}`;
    if (fs.lstatSync(filePath).isDirectory()) {
      getSnippetsFromFolder(filePath, snippets);
    } else {
      let fileName = el.split(".");
      let prefix, name, language;
      if (fileName.length >= 3) {
        prefix = fileName[0];
        name = fileName.slice(1, -1).join(".");
        language = fileName[fileName.length - 1];
      } else {
        [prefix, name, language] = fileName;
      }
      if (!prefix || !name || !language) throw new Error(`Invalid file name ${el}`);

      if (language === "ts" || language === "tsx") language = "ts";
      if (language === "js" || language === "jsx") language = "js";

      console.log(prefix, name, language);

      if (!snippets[language]) snippets[language] = {};
      snippets[language][name] = {
        prefix,
        body: fs.readFileSync(filePath, "utf8").split("\n")
      };
    }
  }
  return snippets;
}

main();
