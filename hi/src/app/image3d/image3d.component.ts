import {
  Component,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Image3DService, Image, View } from './image3d.service';
import { ViewComponent } from './view.component';
import { SlidersComponent } from './slider.component';
import { SlidersService } from './slider.service';
const testFilePath = '/home/hongxwing/Workspace/web_learn/bokeh/data3d.npy';
@Component({
  selector: 'app-image3d',
  templateUrl: './image3d.component.html',
  styleUrls: ['./image3d.component.css']
})
export class Image3DComponent implements AfterViewInit {
  imgSub: Subscription;
  pathSub: Subscription;
  idss: Subscription[] = [];
  id: number;
  isShowHeader = false;
  img: Image;
  path: string;
  @ViewChildren(ViewComponent) private viewsQL: QueryList<ViewComponent>;
  @ViewChild(SlidersComponent) private slider: SlidersComponent;

  private views: ViewComponent[];

  constructor(
    private image3DService: Image3DService,
    private slidersService: SlidersService
  ) {
    this.pathSub = this.image3DService.path$.subscribe(p => {
      this.path = p;
    });
    const reply = this.image3DService.addComponent();
    this.id = reply.id;
    this.imgSub = reply.subject.subscribe(img => {
      this.setImage(img);
    });
    for (let i = 0; i < 3; ++i) {
      const tmp = i;
      this.idss.push(
        this.slidersService.ids$s[i].subscribe(value => {
          this.updateViewsIdss(tmp, value);
        })
      );
    }
  }

  // debug() {
  //   console.log(this.images);
  // }
  // render() {}
  // loadData() {
  //   this.image3DService.loadData(this.path);
  // }
  // // loadData() {

  // // }

  // loadJS() {
  //   const fragment = document
  //     .createRange()
  //     .createContextualFragment(this.images[0].js);
  //   // document.getElementById(this.images[0].id).appendChild(fragment);
  //   const js = document.getElementById(this.images[0].id).appendChild(fragment);
  // }
  ngAfterViewInit() {
    this.views = this.viewsQL.toArray();
  }
  getHead(): void {
    this.image3DService.getHead(this.id, this.path);
  }

  getView(axis: number): void {
    this.clearView(axis);
    this.image3DService.getView(
      this.id,
      this.img.header.path,
      this.img.views[axis]
    );
  }

  getView3(): void {
    for (let i = 0; i < 3; ++i) {
      this.clearView(i);
    }
    this.image3DService.getView3(this.id, this.img.header.path, this.img.views);
  }

  private updateViewsIdss(axis: number, value: number) {
    this.img.views[axis].ids = value;
    this.getView3();
  }

  private initViews(axis: number) {
    this.img.views[axis] = new View(50, axis, this.img.header.shape);
  }

  private initImage(img: Image): void {
    this.img = img;

    for (let i = 0; i < 3; ++i) {
      this.initViews(i);
    }
    this.isShowHeader = true;
  }

  private updateImage(img: Image): void {
    // TODO: check header

    for (let i = 0; i < 3; ++i) {
      if (img.views[i]) {
        this.img.views[i].updateFromView(img.views[i]);
        this.renderView(i);
      }
    }
  }

  setImage(img: Image): void {
    if (this.img) {
      this.updateImage(img);
    } else {
      this.initImage(img);
    }
  }

  // renderImage(): void {
  //   console.log('render image');
  //   console.log(this.img);
  //   // this.renderHead();
  //   if (this.img.views.length > 0) {
  //     for (let i = 0; i < 3; ++i) {
  //       if (this.img.views[i]) {
  //         this.img.views[i] = this.img.views[i];
  //         this.renderView(i);
  //       }
  //     }
  //   }
  //   this.isShow = true;
  // }
  // renderHead(): void {
  //   this.path = img.header.path;
  //   this.shape = img.header.shape;
  // }
  attachJS(js: string) {
    const fragment = document.createRange().createContextualFragment(js);
    const jsNode = document
      .getElementById('views-group-' + this.id)
      .appendChild(fragment);
  }

  // renderView3(js: string) {
  //   for (let i = 0; i < 3; ++i) {
  //     this.renderView(i);
  //   }
  //   setTimeout(() => {
  //     this.attachJS(this.img.view3.js);
  //   }, 0);
  // }

  renderView(axis: number): void {
    this.views[axis].render(this.img.views[axis].idd, this.img.views[axis].js);
  }

  clearView(axis: number): void {
    this.views[axis].clear();
  }

  debug() {
    console.log('debug called.');
    this.image3DService.setPath(testFilePath);
  }

  loadHead() {
    this.getHead();
  }

  loadView(axis: number) {
    this.getView(axis);
  }

  loadView3() {
    this.getView3();
  }

  ngOnDestory() {
    this.imgSub.unsubscribe();
    this.pathSub.unsubscribe();
    for (let i = 0; i < 3; ++i) {
      this.imgSub[i].unsubscribe();
    }
  }
  // addBokehImage(divId: string, js: string) : void{
  // }
}
