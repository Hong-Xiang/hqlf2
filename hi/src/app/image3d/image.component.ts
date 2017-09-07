import { Component, OnDestroy, Input } from '@angular/core';
import { ImageService, Image } from './image.service';
import { Subscription } from 'rxjs/Subscription';

const testFilePath = '/home/hongxwing/Workspace/web_learn/bokeh/data3d.npy';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  imgSub: Subscription;
  id: number;
  isShow = false;
  shape: { x: number; y: number; z: number };
  @Input() path: string;

  constructor(private imageService: ImageService) {
    const reply = this.imageService.addComponent();
    this.id = reply.id;
    this.imgSub = reply.subject.subscribe(img => this.renderImage(img));
  }
  getHead(path: string): void {
    this.imageService.getHead(this.id, path);
  }
  renderImage(img: Image): void {
    console.log('render image');
    console.log(img);
    this.renderHead(img);
    if (img.views.length > 0) {
      for (let i = 0; i < 3; ++i) {
        this.renderView(img, i);
      }
    }
    this.isShow = true;
  }
  renderHead(img: Image): void {
    this.path = img.head.path;
    this.shape = img.head.shape;
  }
  renderView(img: Image, axis: number): void {}
  clearView(): void {}

  debug() {
    this.getHead(testFilePath);
  }
  ngOnDestory() {
    this.imgSub.unsubscribe();
  }
}
