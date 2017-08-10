import { Injectable } from '@angular/core';
// import { getDirectory } from './directory-mock';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { File } from './file';
import { Directory } from './directory';

@Injectable()
export class DirectoryService {
  apiUrl = 'http://192.168.1.118:5000/api/dir';
  constructor(private http: Http) {}

  setApiUrl(urlNew: string): void {
    this.apiUrl = urlNew;
  }

  getDirectory(path: string): Promise<Directory> {
    const encodedPath = encodeURIComponent(path);
    const doubleEncodedPath = encodeURIComponent(encodedPath);
    const getUrl = 'http://192.168.1.118:5000/api/dir/' + doubleEncodedPath;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(res => this.parseDirectory(res.text()))
      .catch(err => this.handleError(err));
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  checkServer(): Promise<string> {
    const getUrl = 'http://192.168.1.118:5000/api/server';
    return this.http
      .get(getUrl)
      .toPromise()
      .then(res => res.text())
      .catch(this.handleError);
  }

  parseDirectory(response: string): Directory {
    const res = JSON.parse(response);
    const files: File[] = [];
    const nbFiles: number = res.files.length;
    for (let i = 0; i < nbFiles; i++) {
      files.push({
        name: res.files[i],
        isdir: res.isdir[i],
        url: null
      });
    }
    return {
      path: res.path,
      parts: res.parts.slice(1),
      files: files,
      parent: res.parent,
    };
  }
}
