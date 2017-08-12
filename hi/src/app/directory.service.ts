import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';

import { Directory } from './directory';
import { FileSystemService } from './fileSystem.service';

@Injectable()
export class DirectoryService {
  private directorySource = new Subject<Directory>();
  directoryOpened$ = this.directorySource.asObservable();
  
  constructor(private fileSystemService: FileSystemService) {}

  exit(directory: Directory) {
    this.fileSystemService
      .getDirectory(directory.root.parent)
      .then(res => this.directorySource.next(res));
  }

  openDirectory(path: string) {
    this.fileSystemService
      .getDirectory(path)
      .then(res => this.directorySource.next(res));
  }
}
//  apiUrl = 'http://192.168.1.118:5000/api/dir/';
//   directory: Directory;
//   isShow = false;

//   constructor(private http: Http) {}
//   setApiUrl(urlNew: string): void {
//     this.apiUrl = urlNew;
//   }
// update_directory(this: DirectoryService, response: string): void {
//   console.log('update Called.');
//   const res = JSON.parse(response);
//   const files: File[] = [];
//   const nbFiles: number = res.files.length;
//   for (let i = 0; i < nbFiles; i++) {
//     files.push({
//       name: res.files[i],
//       isdir: res.isdir[i],
//       url: null
//     });
//   }
//   this.directory = {
//     path: res.path,
//     parts: res.parts.slice(1),
//     files: files,
//     parent: res.parent
//   };
//   this.isShow = true;
//   console.log('update Done.');
// }

// onfullfiled(
//   this: DirectoryService,
//   response: string,
//   callBack: (directory: Directory) => void
// ) {
//   this.update_directory(response);
//   callBack(this.directory);
// }

// get(path: string, callBack: (directory: Directory) => void): void {
//   const encodedPath = encodeURIComponent(path);
//   const doubleEncodedPath = encodeURIComponent(encodedPath);
//   const getUrl = this.apiUrl + doubleEncodedPath;
//   this.http
//     .get(getUrl)
//     .toPromise()
//     .then(res => this.onfullfiled(res.text(), callBack))
//     .catch(err => this.handleError(err));
// }

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

//   handleError(error: any): Promise<any> {
//     console.error('An error occurred', error); // for demo purposes only
//     return Promise.reject(error.body || error);
//   }

//   checkServer(): Promise<string> {
//     const getUrl = 'http://192.168.1.118:5000/api/server';
//     return this.http
//       .get(getUrl)
//       .toPromise()
//       .then(res => res.text())
//       .catch(this.handleError);
//   }
// }
