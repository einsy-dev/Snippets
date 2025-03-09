export const extention = {
  name: "<extention-name>",
  version: "1.0.0",
  author: "<author>",
  license: "ISC",
  description: "<description>",
  contributes: {
    snippets: [] as SnippetI[]
  },

  categories: ["Snippets"]
};

interface SnippetI {
  language: string;
  path: string;
}