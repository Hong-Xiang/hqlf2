import { Injectable, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { RESTfulService, Image3DResponse } from '../restful.service';
import 'rxjs/add/operator/startWith';

const testFilePath = '/home/hongxwing/Workspace/web_learn/bokeh/data3d.npy';

export class Header {
  path: string;
  shape: number[];
}

export class View {
  ids: number;
  axis: number;
  idd: string;
  js: string;

  constructor(ids: number, axis: number, shape: number[]) {
    this.ids = ids;
    this.axis = axis;
    this.idd = undefined;
    this.js = undefined;
  }

  updateFromRaw(raw: { idd: string; js: string }) {
    this.idd = raw.idd;
    this.js = raw.js;
  }

  updateFromView(view: View) {
    this.idd = view.idd;
    this.js = view.js;
  }
}

export class Image {
  header: Header;
  views: View[];
}

@Injectable()
export class Image3DService {
  image$s: Subject<Image>[] = [];
  path$: Subject<string>;
  constructor(
    private httpClient: HttpClient,
    private restfulService: RESTfulService
  ) {
    this.path$ = new Subject<string>();
  }

  // loadData(path: string): void {
  //   const encodedPath = encodeURIComponent(path);
  //   const doubleEncodedPath = encodeURIComponent(encodedPath);
  //   const getUrl = this.apiUrl + doubleEncodedPath;
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

  setPath(path: string) {
    console.log('serv path called.' + path);
    this.path$.next(path);
  }

  addComponent(): { id: number; subject: Subject<Image> } {
    const img$ = new Subject<Image>();
    return { id: this.image$s.push(img$) - 1, subject: img$ };
  }

  clearCompnent(id: number): void {
    this.image$s.slice(id, id + 1);
  }

  url(path: string): string {
    return (
      this.restfulService.image3DApiUrl() + this.restfulService.quotedPath(path)
    );
  }

  request(path: string, params: HttpParams): Observable<Image3DResponse> {
    return this.httpClient.get<Image3DResponse>(this.url(path), {
      params: params,
      observe: 'body',
      responseType: 'json'
    });
  }

  private getImageFromResponse(res: Image3DResponse, type: string) {
    const img = {
      header: {
        path: res.path,
        shape: res.shape
      },
      views: [null, null, null]
    };
    if (type === 'view' || type === 'view3') {
      for (let i = 0; i < 3; ++i) {
        if (res.views[i]) {
          img.views[i] = res.views[i];
        }
      }
    }
    return img;
  }

  getHead(id: number, path: string): void {
    this.request(
      path,
      new HttpParams().append('type', 'head')
    ).subscribe(res => {
      this.image$s[id].next(this.getImageFromResponse(res, 'head'));
    });
  }

  getView(id: number, path: string, view: View): void {
    const params = new HttpParams()
      .append('ids', view.ids.toString())
      .append('axis', view.axis.toString())
      .append('type', 'view');
    this.request(path, params).subscribe(res => {
      this.image$s[id].next(this.getImageFromResponse(res, 'view'));
    });
  }

  getView3(id: number, path: string, views: View[]): void {
    const params = new HttpParams()
      .append('idx', views[0].ids.toString())
      .append('idy', views[1].ids.toString())
      .append('idz', views[2].ids.toString())
      .append('type', 'view3');
    this.request(path, params).subscribe(res => {
      this.image$s[id].next(this.getImageFromResponse(res, 'view3'));
    });
  }

  // getImage(id: number, path: string): void {}
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
