import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TextEditorService } from './texteditor.service';
import { File } from './file';
@Component({
  selector: 'app-editor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.css']
})
export class TextEditorComponent implements OnDestroy {
  file: File;
  subscription: Subscription;
  constructor(private textEditorService: TextEditorService) {
    this.subscription = this.textEditorService.textContent$.subscribe(
      res => (this.file = res)
    );
  }

  onSaveClick() {
    console.log(this.file);
    this.textEditorService.saveFile(this.file);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getFileName() {
    this.textEditorService.getFileName();
  }
}
