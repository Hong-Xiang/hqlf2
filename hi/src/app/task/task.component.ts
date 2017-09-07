import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task;
  @Output() onTaskSubmit = new EventEmitter<number>();
  @Output() onTaskDelete = new EventEmitter<number>();

  submit() {
    this.onTaskSubmit.emit(this.task.id);
  }

  delete() {
    console.log('Task: delete of ' + this.task.id + 'called.');
    this.onTaskDelete.emit(this.task.id);
  }
}
