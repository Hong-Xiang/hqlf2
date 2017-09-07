import { Component } from '@angular/core';
import { Task, TaskService } from './task.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  tasks: Task[];
  data: any;
  createFormShow: boolean;
  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.tasks;
    this.createFormShow = false;
  }
  openCreateTask() {
    this.createFormShow = true;
  }

  createTask(data) {
    this.taskService.create(data);
    this.createFormShow = false;
  }


  cancelTask(): void {
    this.createFormShow = false;
  }

  getAll() {
    this.taskService.getAll();
  }

  getId(id: number) {
    this.taskService.getId(id);
  }

  submit(id: number) {
    this.taskService.submit(id);
  }

  delete(id: number) {
    this.taskService.delete(id);
  }
}
