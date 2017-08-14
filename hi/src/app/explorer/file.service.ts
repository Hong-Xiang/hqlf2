import { Injectable, OnInit, Output} from '@angular/core';
import { File } from './file';
import { FileSystemService } from './fileSystem.service';
@Injectable()
export class FileService {
  filesLoaded: File[];
  fileSelected: File;
  constructor(private fileSystemService: FileSystemService) {}

  findFile(file: File): number {
    for (let i = 0; i < this.filesLoaded.length; ++i) {
      if (file.path === this.filesLoaded[i].path) {
        return i;
      }
    }
    return -1;
  }

  loadFile(file: File): number {
    let i = this.findFile(file);
    if (i < 0) {
      i = this.filesLoaded.length;
      this.filesLoaded.push(file);
    }
    this.fileSystemService.getFile(file.path).then(data => {
      this.filesLoaded[i] = data;
    });
    return i;
  }

  openFile(file: File): number {
    return this.loadFile(file);
  }

  closeFile(file: File) {
    const i = this.findFile(file);
    if (i > 0) {
      this.filesLoaded
    }
  }
}
