#! /usr/bin/env node
import fs from "fs";
import { Command } from "commander";
import { snipgen } from "./snipgen";
import { OptionsI, ConfigI } from "./shared/interface";
import Input from "./input";

let version = JSON.parse(fs.readFileSync("./package.json", "utf8")).version;

async function main() {
  const program = new Command();
  program.name("snipgen").description("Simple vs-code snippets generator").version(version, "-v, --version", "display the current version");
  program
    .option("-d --dir [dir]", "folder path with code for snippets")
    .option("-o --outDir [outDir]", "output folder path")
    .option("-c --clean", "clean output folder")
    .option("-t --tsc", "transpile to js")
    .option("-e --extension", "build for extension")
    .option("-l --local", "build for local")
    .option("-p --project", "build for project")
    .parse();

  let options: OptionsI = program.opts();
  let config: ConfigI = {
    dir: "./src",
    outDir: "./out",
    tsc: false,
    clean: false,
    target: "extention"
  };

  const { extension, local, project } = options;
  if (extension || local || project) {
    config.target = extension ? "extention" : local ? "local" : project ? "project" : "extention";
    delete options.extension;
    delete options.local;
    delete options.project;
  }

  if (!Object.keys(options).length) {
    await Input.text("dir", "Folder path with your code:", "./src");
    await Input.text("outDir", "Output folder path:", "./out");
    await Input.confirm("clean", "Clean output folder:", true);
    await Input.confirm("tsc", "Transpile ts/tsx files to js/jsx:", true);
    await Input.select("target", "Build for:", ["extension", "local", "project"], "extension");
  }
  if (!Input.data.dir && !options.dir) {
    await Input.text("dir", "Folder path with your code:", "./src");
  }
  options = Object.assign(options, Input.data);
  config = Object.assign(config, options);
  
  await snipgen(options.dir!, config);
}

main();

