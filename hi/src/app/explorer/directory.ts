import { File } from './file';
export class Directory {
  self: File;
  children: [File, Directory];
}
