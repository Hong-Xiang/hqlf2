import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { File } from './file';
import { FileSystemService } from './fileSystem.service';
@Injectable()
export class FileService {
  filesLoaded: File[] = [];
  fileSelected: File;
  constructor(private fileSystemService: FileSystemService) {}

  findFile(path: string): number {
    for (let i = 0; i < this.filesLoaded.length; ++i) {
      if (path === this.filesLoaded[i].path) {
        return i;
      }
    }
    return -1;
  }

  getDummyFile(path: string): File {
    return {
      name: undefined,
      path: path,
      parent: undefined,
      url: undefined,
      isdir: undefined,
      isexe: undefined,
      contents: undefined,
      childrenIsDir: undefined,
      childrenPath: undefined,
      childrenName: undefined
    };
  }

  loadDummyFile(path: string): number {
    this.filesLoaded.push(this.getDummyFile(path));
    return this.filesLoaded.length - 1;
  }

  // Only load when file is not exists in this.fileLoaded;
  loadOrFindFile(path: string): Promise<number> {
    const i = this.findFile(path);
    let out_index: Promise<number>;
    if (i < 0) {
      out_index = this.loadFile(path);
    } else {
      out_index = Promise.resolve(i);
    }
    return out_index;
  }

  // Load file, if file already exists in this.fileLoaded, update it.
  loadFile(path: string): Promise<number> {
    let i = this.findFile(path);
    if (i < 0) {
      i = this.loadDummyFile(path);
    }
    return this.fileSystemService.getFile(path).then(data => {
      this.filesLoaded[i] = data;
      return i;
    });
  }

  getFile(path: string, isfile: boolean): Promise<File> {
    if (isfile) {
      return this.fileSystemService.getFile(path);
    } else {
      return this.fileSystemService.getDirectory(path);
    }
  }

  getTestFile(path: string): Promise<File> {
    return this.fileSystemService.getTestFile(path);
  }

  // loadOrFindFile(path: string): number {
  //   const i = this.findFile(path);
  //   if (i < 0) {
  //     return this.loadFile(path);
  //   }
  //   return i;
  // }

  // loadFile(path: string): number {
  //   const file = this.fileSystemService.getFile(path);
  //   let i = this.findFile(path);
  //   if (i < 0) {
  //     i = this.filesLoaded.length;
  //   }
  //   this.filesLoaded[i] = file;
  //   return i;
  // }

  closeFile(path: string) {
    const i = this.findFile(path);
    if (i > 0) {
      this.filesLoaded.splice(i, 0);
      this.onCloseFile(path);
    }
  }

  @Output()
  onCloseFile(file): File {
    return file;
  }
}
