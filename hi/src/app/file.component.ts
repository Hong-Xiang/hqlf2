import { Component, Input } from '@angular/core';
import { File } from './file';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html'
})
export class FileComponent {
  @Input() file: File;
}
