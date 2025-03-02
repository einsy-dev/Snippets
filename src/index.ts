#! /usr/bin/env node
import { exec } from "child_process";
import getInput from "./input";
import { Command } from "commander";
const program = new Command();

program
  .name("nestg")
  .description("generate elements for Nest.js")
  .version("1.1.1")
  .action(async () => {
    const { elements } = await getInput();
    const args = process.argv.slice(2).join(" ");
    const defArgs = "--no-spec";

    for (const element of elements) {
      await exec(
        `nest g ${element} ${args} ${defArgs}`,
        (err, stdout, stderr) => {
          if (err) {
            console.log(`error: ${err.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
        }
      );
    }
  })
  .parse();
