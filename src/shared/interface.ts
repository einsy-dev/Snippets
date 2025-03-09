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

interface ConfigI {
  dir: string;
  outDir: string;
  tsc: boolean;
  clean: boolean;
  extention: boolean;
}

export type { FileI, FilesI, SnippetsI, ConfigI };
