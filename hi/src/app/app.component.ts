import {
  Component
  // Output,
  // EventEmitter,
  // AfterViewInit,
  // ViewChild
} from '@angular/core';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// // import * as Rx from 'rxjs/Rx';

// import { Http } from '@angular/http';

// import { FileSystemService } from './file/fileSystem.service';
// import { FileService } from './file/file.service';
// import { File } from './file/file';

// import { TextEditorComponent } from './textEditor/textEditor.component';
// import { Image3DComponent } from './image3d/image3d.component';
// import { Image3DService } from './image3d/image3d.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  // data = [1, 2, 3, 4, 5, 6];
  // idSelected = 0;
  // path: string;
  // dataJSON: any[];
  // arrayTest: [number, string];
  // filedata: File[];
  // @ViewChild(TextEditorComponent)
  // private textEditorComponent: TextEditorComponent;
  // @ViewChild(Image3DComponent) private image3DComponent: Image3DComponent;
  // constructor(private http: Http, private image3DService: Image3DService) {}
  // // constructor(private http: Http, private fileService: FileService) {
  // //   // this.filedata = this.fileService.filesLoaded;
  // // }
  // ngAfterViewInit() {}
  // addId() {
  //   this.idSelected++;
  //   this.idSelected = this.idSelected % 6;
  //   console.log('id -> ' + this.idSelected);
  // }
  // decId() {
  //   this.idSelected--;
  //   this.idSelected = (this.idSelected + 6) % 6;
  //   console.log('id -> ' + this.idSelected);
  // }
  // change() {
  //   for (let i = 0; i < this.data.length; ++i) {
  //     this.data[i] = this.data[i] + 1;
  //     console.log(this.data);
  //   }
  // }
  // loadJSON() {
  //   this.http.get('/assets/testdata.json').subscribe(data => {
  //     this.dataJSON = data.json()['files'];
  //     console.log(data);
  //     console.log(this.dataJSON);
  //   });
  // }
  // deleteTest() {
  //   this.data.splice(2, 1);
  //   console.log(this.data);
  // }
  // setArrayTest() {
  //   this.arrayTest.push(1);
  //   this.arrayTest.push('aaa');
  //   this.arrayTest.push('bbb');
  //   this.arrayTest.push(1.0546);
  //   console.log(this.arrayTest);
  // }
  // testFileSystem() {}
  // explorerOpenFileEvent(event: string) {
  //   console.log(event);
  //   if (event.endsWith('.txt')) {
  //     this.editFile(event);
  //   }
  //   if (event.endsWith('.npy')) {
  //     this.showImage(event);
  //   }
  // }
  // showImage(path: string) {
  //   document.getElementById('text-editor').hidden = true;
  //   document.getElementById('image-show3d').hidden = false;
  //   this.image3DService.setPath(path);
  // }
  // editFile(path: string) {
  //   document.getElementById('text-editor').hidden = false;
  //   document.getElementById('image-show3d').hidden = true;
  //   this.textEditorComponent.openFile(path);
  // }
  // // checkSvr(): void {
  // //   this.directoryService.checkServer().then(res => this.data = res).catch();
  // // }
  // // getDir(path): void {
  // //   this.directoryService.getDirJSON(path).then(res => this.data = res).catch();
  // // }
  // debug() {
  //   console.log('debug called.');
  //   Observable.of(1, 2, 3).subscribe(n => {
  //     console.log(n);
  //   });
  //   this.idSelected++;
  //   console.log(this.data[3]);
  // }
}
