import { input, select, confirm, checkbox } from "@inquirer/prompts";

interface DataI {
  [key: string]: string | string[] | boolean;
}

class Input {
  data: DataI = {};

  async text(key: string, message: string, defaultValue?: string) {
    this.data[key] = await input({
      message,
      default: defaultValue
    });
  }

  async select(key: string, message: string, choices: string[], defaultValue?: string) {
    this.data[key] = await select({
      message,
      choices,
      loop: false,
      default: defaultValue
    });
  }

  async checkbox(key: string, message: string, choices: string[], defaultValue?: string) {
    this.data[key] = await checkbox({
      message,
      choices,
      loop: false
    });
  }

  async confirm(key: string, message: string, defaultValue?: boolean) {
    this.data[key] = await confirm({
      message,
      default: defaultValue
    });
  }
}

export default new Input();
