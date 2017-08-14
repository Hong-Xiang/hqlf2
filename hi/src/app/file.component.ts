import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { File } from './file';
import { FileService } from './file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html'
})
export class FileComponent {
  @Input() file: File;
  constructor(private fileService: FileService) {}

  onClick() {
    this.fileService.openFile(this.file);
  }
}
