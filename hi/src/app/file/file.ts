export class File {
  name: string;
  path: string;
  parent: string;
  isdir: boolean;
  isexe: boolean;
  url: string;
  childrenPath: string[] | null;
  childrenIsDir: boolean[] | null;
  childrenName: string[] | null;
  contents: string | null;
}
