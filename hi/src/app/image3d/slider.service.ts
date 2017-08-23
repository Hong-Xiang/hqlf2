import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';
@Injectable()
export class SlidersService {
  ids$s: Subject<number>[] = [];

  constructor() {
    for (let i = 0; i < 3; ++i) {
      this.ids$s.push(new Subject<number>());
    }
  }

  changeSlice(axis: number, value: number) {
    this.ids$s[axis].next(value);
  }
}
