import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { File } from './file';
import { FileSystemService } from './fileSystem.service';

@Injectable()
export class TextEditorService {
  private textSource = new Subject<File>();
  file: File;
  textContent$ = this.textSource.asObservable();

  constructor(private fileSystemService: FileSystemService) {}

  editFile(file: File) {
    this.fileSystemService.getFile(file.path).then(res => {
      this.textSource.next(res);
      console.log(res);
    });
    // this.file =
  }

  getFileName(): string {
    if (this.file) {
      return this.file.name;
    } else {
      return 'No Opened File.';
    }
  }

  saveFile(file: File) {
    this.fileSystemService.saveFile(file);
  }
}
