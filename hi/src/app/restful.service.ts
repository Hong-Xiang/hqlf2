import { Injectable } from '@angular/core';

export class Image3DResponse {
  path: string;
  shape: number[];
  views: {
    ids: number;
    idd: string;
    js: string;
  }[];
}

@Injectable()
export class RESTfulService {
  // serverIp(): string {}
  apiUrl(): string {
    return 'http://192.168.1.118:5000/api/';
  }
  quotedPath(path: string): string {
    return encodeURIComponent(encodeURIComponent(path));
  }
  image3DApiUrl(): string {
    return this.apiUrl() + 'image/';
  }
}
