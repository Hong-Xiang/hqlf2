import { Component } from '@angular/core';
import { SliderModule } from 'primeng/primeng';
import { SlidersService } from './slider.service';
class Range1D {
  min: number;
  max: number;
}

@Component({
  selector: 'app-image3d-sliders',
  templateUrl: './slider.component.html'
})
export class SlidersComponent {
  ranges: Range1D[] = [];
  values: number[] = [];
  labels = ['z-index:', 'y-index:', 'x-index:'];
  isShow: boolean;

  constructor(private sliderService: SlidersService) {
    this.isShow = false;
    for (let i = 0; i < 3; ++i) {
      this.ranges.push({ min: 0, max: 99 });
      this.values.push(50);
    }
  }

  sliderChange(axis: number, event) {
    this.sliderService.changeSlice(axis, event.value);
  }

  onInc(axis: number) {
    this.values[axis]++;
    this.sliderService.changeSlice(axis, this.values[axis]);
  }

  onDec(axis: number) {
    this.values[axis]--;
    this.sliderService.changeSlice(axis, this.values[axis]);
  }
}
