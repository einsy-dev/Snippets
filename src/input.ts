import { input, checkbox } from "@inquirer/prompts";

async function getInput(): Promise<{ elements: string[] }> {
  let result = { elements: [] };

  result.elements = await checkbox({
    message: "Choose your services",
    choices: [
      { name: "application", value: "application" },
      { name: "class", value: "cl" },
      { name: "configuration", value: "config" },
      { name: "controller", value: "co" },
      { name: "decorator", value: "d" },
      { name: "filter", value: "f" },
      { name: "gateway", value: "ga" },
      { name: "guard", value: "gu" },
      { name: "interceptor", value: "itc" },
      { name: "interface", value: "itf" },
      { name: "library", value: "lib" },
      { name: "middleware", value: "mi" },
      { name: "module", value: "mo" },
      { name: "pipe", value: "pi" },
      { name: "resolver", value: "r" },
      { name: "resource", value: "res" },
      { name: "service", value: "s" },
      { name: "sub-app", value: "app" }
    ] as never
  });
  return result;
}
export default getInput;
