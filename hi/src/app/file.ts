export class File {
  name: string;
  path: string;
  parent: string;
  isdir: boolean;
  isexe: boolean;
  url: string;
  contents: string | File[] | undefined;

  constructor(
    name: string,
    path: string,
    parent: string,
    isdir: boolean,
    isexe: boolean,
    url?: string,
    contents?: string | string[] | null,
    isdirs?: boolean[],
    isexes?: boolean[]
  ) {
    this.name = name;
    this.parent = parent;
    if (path) {
      this.path = path;
    } else {
      this.path = parent + '/' + name;
    }
    this.isdir = isdir;
    this.isexe = isexe;
    if (url) {
      this.url = url;
    }
    if (contents) {
      if (contents instanceof Array) {
        const nbFiles = contents.length;
        const files: File[] = [];
        for (let i = 0; i < nbFiles; ++i) {
          files.push(
            new File(contents[i], undefined, this.path, isdirs[i], isexes[i])
          );
        }
        this.contents = files;
      } else {
        this.contents = contents;
      }
    }
  }
}
