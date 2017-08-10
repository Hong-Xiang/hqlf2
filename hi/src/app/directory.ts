import { File } from './file';

export class Directory {
  path: string;
  parts: string[];
  files: File[];
  parent: string;
}

