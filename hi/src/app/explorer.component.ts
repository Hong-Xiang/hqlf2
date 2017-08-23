import { Component, ViewChild } from '@angular/core';
import { TextEditorComponent } from './textEditor/textEditor.component';
import { Image3DService } from './image3d/image3d.service';

@Component({
  selector: 'app-explorer-main',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css'],
  providers: []
})
export class ExplorerComponent {
  @ViewChild(TextEditorComponent)
  private textEditorComponent: TextEditorComponent;

  constructor(private image3DService: Image3DService) {}

  explorerOpenFileEvent(event: string) {
    console.log(event);
    if (event.endsWith('.txt')) {
      this.editFile(event);
    }
    if (event.endsWith('.out')) {
      this.editFile(event);
    }
    if (event.endsWith('.sh')) {
      this.editFile(event);
    }
    if (event.endsWith('.npy')) {
      this.showImage(event);
    }
  }

  showImage(path: string) {
    document.getElementById('text-editor').hidden = true;
    document.getElementById('image-show3d').hidden = false;
    this.image3DService.setPath(path);
  }

  editFile(path: string) {
    document.getElementById('text-editor').hidden = false;
    document.getElementById('image-show3d').hidden = true;
    this.textEditorComponent.openFile(path);
  }
}
