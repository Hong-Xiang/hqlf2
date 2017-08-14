import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
  path: string;
  apiUrl = 'http://192.168.1.118:5000/api/';
  constructor(private http: Http) {}

  runScript(path: string, shellFile: string) {
    const encodedPath = encodeURIComponent(path);
    const doubleEncodedPath = encodeURIComponent(encodedPath);
    const getUrl = this.apiUrl + 'task/' + doubleEncodedPath;
    console.log(path);
    const data = { command: 'sbatch ./' + shellFile + ' > task.start' };
    console.log(data);
    return this.http.post(getUrl, data).toPromise().then(res => {
      console.log('Task Submitted');
      console.log(res);
      return res.json();
    });
  }
}
