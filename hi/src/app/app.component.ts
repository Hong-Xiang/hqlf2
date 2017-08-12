import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'app';
  data = 'not init';
  path: string;
  constructor() {}

  updateData(): void {
    this.data = 'updated';
  }

  // checkSvr(): void {
  //   this.directoryService.checkServer().then(res => this.data = res).catch();
  // }

  // getDir(path): void {
  //   this.directoryService.getDirJSON(path).then(res => this.data = res).catch();
  // }
}
