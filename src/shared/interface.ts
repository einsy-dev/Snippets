interface FileI {
  name: string;
  path: string;
}

interface FilesI {
  [extentions: string]: FileI[];
}

interface SnippetsI {
  [language: string]: {
    [name: string]: {
      prefix: string;
      body: string[];
    };
  };
}

interface OptionsI {
  dir?: string;
  outDir?: string;
  tsc?: boolean;
  clean?: boolean;
  extension?: boolean;
  local?: boolean;
  project?: boolean;
}

interface ConfigI {
  dir: string;
  outDir: string;
  tsc: boolean;
  clean: boolean;
  target: "extention" | "local" | "project";
}

export type { FileI, FilesI, SnippetsI, OptionsI, ConfigI };
