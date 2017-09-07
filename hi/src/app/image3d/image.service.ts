import { Injectable, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { RESTfulService } from '../restful.service';

class ImageHead {
  path: string;
  shape: { x: number; y: number; z: number };
}

class ImageView {
  id: string;
  js: string;
}

export class Image {
  head: ImageHead;
  views: ImageView[];
}

@Injectable()
export class ImageService {
  imageSubjects: Subject<Image>[] = [];

  constructor(
    private httpClient: HttpClient,
    private restfulService: RESTfulService
  ) {}

  addComponent(): { id: number; subject: Subject<Image> } {
    const img$ = new Subject<Image>();
    return { id: this.imageSubjects.push(img$) - 1, subject: img$ };
  }

  clearCompnent(id: number): void {
    this.imageSubjects.slice(id, id + 1);
  }

  url(path: string): string {
    return (
      this.restfulService.image3DApiUrl() + this.restfulService.quotedPath(path)
    );
  }

  getHead(id: number, path: string): void {
    this.httpClient
      .get<any>(this.url(path), {
        params: new HttpParams().append('head', 'true'),
        observe: 'body',
        responseType: 'json'
      })
      .subscribe(res => {
        console.log(res);
        this.imageSubjects[id].next({
          head: {
            path: path,
            shape: { x: res.shape[0], y: res.shape[1], z: res.shape[2] }
          },
          views: []
        });
      });
  }
  // getHead(path: string): Observable<number> {
  //   return this.httpClient
  //     .get(this.getUrl(path), {
  //       params: new HttpParams().append('head', 'true')
  //     })
  //     .map(res => {
  //       { shape: { x: res[0], y: res[1], z: res[2] } };
  //       return
  //     });
  // }

  // loadData(path: string, axis: number): void {
  //   const getUrl = this.getUrl(path);
  //   let params = new HttpParams();
  //   params = params
  //     .append('id_slice', '50')
  //     .append('axis', '1')
  //     .append('dw', '6')
  //     .append('dh', '6')
  //     .append('x0', '-3')
  //     .append('x1', '3')
  //     .append('y0', '-3')
  //     .append('y1', '3');
  //   console.log(getUrl);
  //   console.log(params);
  //   this.httpClient
  //     .get<any>(getUrl, {
  //       params: params,
  //       observe: 'body',
  //       responseType: 'json'
  //     })
  //     .subscribe(res => {
  //       console.log(res.js.length);
  //       if (this.images.length === 0) {
  //         this.images.push({ id: res.id, js: res.js });
  //       } else {
  //         this.images[0] = { id: res.id, js: res.js };
  //       }
  //       console.log(this.images);
  //     });
  // }

  // loadDataOld(path: string) {
  //   const encodedPath = encodeURIComponent(path);
  //   const doubleEncodedPath = encodeURIComponent(encodedPath);
  //   const getUrl = this.apiUrl + doubleEncodedPath;
  //   const params = {
  //     id_slice: '0',
  //     axis: '1',
  //     dw: '6',
  //     dh: '6',
  //     x0: '-3',
  //     x1: '3',
  //     y0: '-3',
  //     y1: '3'
  //   };
  //   this.http.get(getUrl, { params: params }).subscribe(data => {
  //     const dataj = data.json();
  //     console.log(dataj);
  //     this.images.push({ id: dataj.id, js: dataj.js });
  //   });
  // }
  // handleError(error: any): Observable<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Observable.(error.body || error);
  // }

  // loadData(path: string): Observable<SingleImage> {
  //   const encodedPath = encodeURIComponent(path);
  //   const doubleEncodedPath = encodeURIComponent(encodedPath);
  //   const getUrl = this.apiUrl + doubleEncodedPath;
  //   const params = new HttpParams();

  //   return this.httpClient
  //
  //     .catch(err => this.handleError(err));
  // }
}
