import { Injectable, OnInit } from '@angular/core';
import { File } from './file';
import { FileSystemService } from './fileSystem.service';
import { DirectoryService } from './directory.service';
import { TextEditorService } from './texteditor.service';
@Injectable()
export class FileService {
  constructor(
    private fileSystemService: FileSystemService,
    private directoryService: DirectoryService,
    private texteditorService: TextEditorService
  ) {}

  openFile(file: File) {
    if (file.isdir) {
      this.directoryService.openDirectory(file.path);
    } else {
      this.texteditorService.editFile(file);
    }
  }
}
