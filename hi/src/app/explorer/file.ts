export class File {
  name: string;
  path: string; // url
  parent: string; // url
  isdir: boolean;
  isexe: boolean;
  url: string;
  contents: string[] | undefined;
}
