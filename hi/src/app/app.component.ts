import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'app';
  data = [1, 2, 3, 4, 5, 6];
  idSelected = 0;
  path: string;
  dataJSON: any[];
  arrayTest: [number, string];
  constructor(private http: Http) {}

  addId() {
    this.idSelected++;
    this.idSelected = this.idSelected % 6;
    console.log('id -> ' + this.idSelected);
  }

  decId() {
    this.idSelected--;
    this.idSelected = (this.idSelected + 6) % 6;
    console.log('id -> ' + this.idSelected);
  }

  change() {
    for (let i = 0; i < this.data.length; ++i) {
      this.data[i] = this.data[i] + 1;
      console.log(this.data);
    }
  }

  loadJSON() {
    this.http.get('/assets/testdata.json').subscribe(data => {
      this.dataJSON = data.json()['files'];
      console.log(data);
      console.log(this.dataJSON);
    });
  }

  deleteTest() {
    this.data.
    this.data.splice(2, 1);
    console.log(this.data);
  }
  setArrayTest() {
    this.arrayTest.push(1);
    this.arrayTest.push('aaa');
    this.arrayTest.push('bbb');
    this.arrayTest.push(1.0546);
    console.log(this.arrayTest);
  }
  // checkSvr(): void {
  //   this.directoryService.checkServer().then(res => this.data = res).catch();
  // }

  // getDir(path): void {
  //   this.directoryService.getDirJSON(path).then(res => this.data = res).catch();
  // }
}
