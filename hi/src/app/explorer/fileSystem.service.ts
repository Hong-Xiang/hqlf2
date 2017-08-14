import { Injectable, OnInit } from '@angular/core';
// import { getDirectory } from './directory-mock';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { File } from './file';
import { Directory } from './directory';

@Injectable()
export class FileSystemService implements OnInit {
  apiUrl = 'http://192.168.1.118:5000/api/';
  files: File[];

  constructor(private http: Http) {}

  parseFile(result: any): File {
    const res = JSON.parse(result);
    const file: File = {
      name: res.name,
      path: res.path,
      parent: res.parent,
      isdir: false,
      isexe: res.isexe,
      url: 'UKN',
      contents: res.contents
    };
    return file;
  }

  getFile(filePath: string): Promise<File> {
    for (const f of this.files) {
      if (f.path === filePath) {
        return Promise.resolve(f);
      }
    }
  }

  closeFile(file: File) {
    for (let i = 0; i < this.files.length; ++i) {
      if (this.files[i].path === file.path) {
        this.files.splice(i, 1);
        return;
      }
    }
  }

  saveFile(file: File) {
    for (let i = 0; i < this.files.length; ++i) {
      if (this.files[i].path === file.path) {
        this.files[i] = file;
        return;
      }
    }
    this.files.push(file);
  }

  ngOnInit() {
    this.http
      .get('/assets/testdata.json')
      .subscribe(data => (this.files = data.json()['files']));
  }

  // saveFile(file: File): Promise<string> {
  //   const encodedPath = encodeURIComponent(file.path);
  //   const doubleEncodedPath = encodeURIComponent(encodedPath);
  //   const getUrl = this.apiUrl + 'file/' + doubleEncodedPath;
  //   console.log(file.contents);
  //   const data = { data: file.contents + '\n' };
  //   console.log(data);
  //   return this.http.put(getUrl, data).toPromise().then(res => {
  //     console.log('Save succeed');
  //     console.log(res);
  //     return res.json();
  //   });
  // }

  // getFile(path: string): Promise<File> {
  //   const encodedPath = encodeURIComponent(path);
  //   const doubleEncodedPath = encodeURIComponent(encodedPath);
  //   const getUrl = this.apiUrl + 'file/' + doubleEncodedPath;
  //   return this.http
  //     .get(getUrl)
  //     .toPromise()
  //     .then(res => this.parseFile(res.text()))
  //     .catch(err => this.handleError(err));
  // }

  // getDirectory(path: string): Promise<Directory> {
  //   const encodedPath = encodeURIComponent(path);
  //   const doubleEncodedPath = encodeURIComponent(encodedPath);
  //   const getUrl = this.apiUrl + 'dir/' + doubleEncodedPath;

  //   return this.http
  //     .get(getUrl)
  //     .toPromise()
  //     .then(res => this.parseDirectory(res.text()))
  //     .catch(err => this.handleError(err));
  // }

  // update_file(response: string): void {
  //   const res = JSON.parse(response);
  //   const fileNew = new File(
  //     res.name,
  //     res.path,
  //     res.parent,
  //     res.isdir,
  //     res.idexe,
  //     res.url,
  //     res.contents,
  //     res.isdirs,
  //     res.isexes
  //   );
  //   for (let i = 1; i < this.files.length; ++i) {
  //     if (this.files[i].path === res.path) {
  //       this.files[i] = fileNew;
  //     }
  //   }
  // for (var f in this.files) {
  //     if(f.path === pathNew)

  // }
  // const constents: string = res.contents;
  // this.file = {
  //     name: res.name,
  //     isdir: false,
  //     url: null
  //   });
  // }
  // this.directory = {
  //   path: res.path,
  //   parts: res.parts.slice(1),
  //   files: files,
  //   parent: res.parent
  // };
  // this.isShow = true;
  // }

  //   onfullfiled(
  //     this: DirectoryService,
  //     response: string,
  //     callBack: (directory: Directory) => void
  //   ) {
  //     this.update_directory(response);
  //     callBack(this.directory);
  //   }

  //   get(path: string, callBack: (file: File) => void): void {
  //     const encodedPath = encodeURIComponent(path);
  //     const doubleEncodedPath = encodeURIComponent(encodedPath);
  //     const getUrl = this.apiUrl + doubleEncodedPath;
  //     this.http
  //       .get(getUrl)
  //       .toPromise()
  //       .then(res => this.onfullfiled(res.text(), callBack))
  //       .catch(err => this.handleError(err));
  //   }

  // put(path: string): Promise<Directory> {
  //   const encodedPath = encodeURIComponent(path);
  //   const doubleEncodedPath = encodeURIComponent(encodedPath);
  //   const getUrl = this.apiUrl + doubleEncodedPath;
  //   return this.http
  //     .post(getUrl)
  //     .toPromise()
  //     .then(res => this.parseDirectory(res.text()))
  //     .catch(err => this.handleError(err));
  // }

  // post(path: string): Promise<Directory> {
  //   const encodedPath = encodeURIComponent(path);
  //   const doubleEncodedPath = encodeURIComponent(encodedPath);
  //   const getUrl = this.apiUrl + doubleEncodedPath;
  //   return this.http
  //     .delete(getUrl)
  //     .toPromise()
  //     .then(res => this.parseDirectory(res.text()))
  //     .catch(err => this.handleError(err));
  // }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.body || error);
  }
}