import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image3d-view',
  templateUrl: './view.component.html'
})
export class ViewComponent {
  id: string;
  isShow: boolean;
  constructor() {
    this.isShow = false;
  }
  hide() {
    this.isShow = false;
  }
  show() {
    this.isShow = true;
  }
  attachJS(js: string) {
    const fragment = document.createRange().createContextualFragment(js);
    const jsNode = document.getElementById(this.id).appendChild(fragment);
  }
  clear() {
    if (document.getElementById(this.id)) {
      document.getElementById(this.id).remove();
    }
    this.hide();
  }
  render(id: string, js: string) {
    this.show();
    this.id = id;
    if (js) {
      setTimeout(() => {
        this.attachJS(js);
      }, 0);
    }
  }
}
