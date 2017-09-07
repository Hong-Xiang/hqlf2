import {Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
})
export class CreateTaskComponent {
  @Input() templateName: string;
  data: any = {task_template_name: this.templateName,
    name: 'test hi',
    path: '/tmp/w20170904/tasks.yaml',
    workdir: '/tmp/w20170906',
    };
  @Output() onTaskCreate = new EventEmitter<any>();
  @Output() onTaskCancel = new EventEmitter<string>();
  constructor(
  ) {
  }

  onOkClick() {
    console.log(this.data);
    this.onTaskCreate.emit(this.data);
  }

  onCancelClick() {
    this.onTaskCancel.emit('Cancel');
  }
}
