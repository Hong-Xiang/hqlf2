import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

export class Task {
  id: number;
  name: string;
  workdir: string;
  pre: number[];
  state: string[];
  command: string;
  sid: string;
  cmd: string;
}

const task_mooc: Task = {
  id: 1,
  name: 'test',
  workdir: '/tmp/wkdir',
  pre: [2, 3, 4],
  state: ['Pending', 'Free'],
  command: 'ls',
  sid: null,
  cmd: null,
};

@Injectable()
export class TaskService {
  tasks: Task[] = [];

  path: string;
  apiUrl = 'http://192.168.1.118:5000/api/';
  constructor(private http: Http) {}

  runScript(path: string, shellFile: string) {
    const encodedPath = encodeURIComponent(path);
    const doubleEncodedPath = encodeURIComponent(encodedPath);
    const getUrl = this.apiUrl + 'task/' + doubleEncodedPath;
    const data = { command: 'sbatch ./' + shellFile + ' > task.start' };
    return this.http.post(getUrl, data).toPromise().then(res => {
      return res.json();
    });
  }

  private addTask(task: Task): void {
      console.log(task);
      let found = false;
      if (task) {
        for (let i = 0; i < this.tasks.length; ++i) {
          if (this.tasks[i].id === task.id) {
            if (found) {
              this.tasks.splice(i, 1);
            } else {
              this.tasks[i] = task;
              found = true;
            }
          }
        }
        if (!found) {
          this.tasks.push(task);
        }
      }
  }

  create(data) {
    const getUrl = this.apiUrl + 'jobs';
    this.http.post(getUrl, data).subscribe(res => {
      this.tasks.splice(0, this.tasks.length);
      for (const t of res.json()) {
        this.tasks.push(t);
      }
    });
  }

  getAll(): void {
    const getUrl = this.apiUrl + 'jobs';
    this.http.get(getUrl).subscribe(res => {
      this.tasks.splice(0, this.tasks.length);
      for (const t of res.json()) {
        this.tasks.push(t);
      }
    });
  }

  getId(id: number): void {
    const getUrl = this.apiUrl + 'job/' + id;
    this.http.get(getUrl).subscribe(res => {
      this.addTask(res.json());
    });
  }

  submit(id: number): void {
    const getUrl = this.apiUrl + 'job/' + id;
    const data = {'task': 'submit'};
    this.http.put(getUrl, data).subscribe(res => {
      this.getAll();
    });
  }

  delete(id: number): void {
    console.log('delete of ' + id + 'called.');
    const getUrl = this.apiUrl + 'job/' + id;
    this.http.delete(getUrl).subscribe(res => {
      this.getAll();
    });
  }
}
