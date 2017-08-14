import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { File } from '../file/file';
import { FileService } from '../file/file.service';
import { TextEditorService } from './textEditor.service';

const testFilePaths = [
  '/tmp/home/f0',
  '/tmp/home/f1',
  '/tmp/home/f2/f4',
  '/tmp/home/f2/f5'
];

@Component({
  selector: 'app-texteditor',
  templateUrl: './textEditor.component.html'
})
export class TextEditorComponent {
  files: File[] = [];
  selectedId: number;
  constructor(private textEditorService: TextEditorService) {}

  findFile(path: string): number {
    for (let i = 0; i < this.files.length; ++i) {
      if (this.files[i].path === path) {
        return i;
      }
    }
    return -1;
  }

  openFile(path: string) {
    const findId = this.findFile(path);
    console.log(findId);
    if (findId >= 0) {
      this.selectedId = findId;
      return;
    }
    this.textEditorService.openFile(path).then(file => {
      console.log(file);
      this.files.push(file);
      this.selectedId = this.files.length - 1;
    });
  }

  reload() {
    this.textEditorService
      .openFile(this.files[this.selectedId].path)
      .then(file => {
        this.files[this.selectedId] = file;
      });
  }
  saveFile() {
    this.textEditorService.saveFile(this.files[this.selectedId]);
  }

  tabChange(event) {
    this.selectedId = event.index;
  }

  tabClose(event) {
    console.log(event.index);
    console.log(this.selectedId);

    if (event.index === this.selectedId) {
      const nbFilesPre = this.files.length;
      this.files.splice(event.index, 1);
      if (nbFilesPre === 1) {
        this.selectedId = null;
        return;
      }
      if (this.selectedId === 0) {
        this.selectedId = this.files.length - 1;
      }
      this.selectedId = this.selectedId - 1;
    }
  }

  checkSelected(index) {
    return index === this.selectedId;
  }

  runShell() {
    this.textEditorService.runTask(this.files[this.selectedId]);
  }
}
