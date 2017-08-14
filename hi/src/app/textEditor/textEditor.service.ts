import { Injectable, OnInit } from '@angular/core';
import { File } from '../file/file';
import { FileSystemService } from '../file/fileSystem.service';
import { TaskService } from '../task/task.service';

@Injectable()
export class TextEditorService {
  files: File[];
  focusId: number;

  constructor(
    private fileSystemService: FileSystemService,
    private taskService: TaskService
  ) {}

  openFile(path: string): Promise<File> {
    return this.fileSystemService.getFile(path).then(file => {
      return {
        name: file.name,
        path: file.path,
        contents: file.contents,
        parent: file.parent,
        isdir: false,
        isexe: file.isexe,
        childrenName: [],
        childrenPath: [],
        childrenIsDir: [],
        url: undefined
      };
    });
  }

  saveFile(file: File) {
    this.fileSystemService.saveFile(file);
  }

  runTask(file: File) {
    this.taskService.runScript(file.parent, file.name);
  }
}
