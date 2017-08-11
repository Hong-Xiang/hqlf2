import { Component, Input, OnInit } from '@angular/core';
import { Directory } from './directory';
import { DirectoryService } from './directory.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  directory: Directory;
  isShow = false;
  path = '/home/hongxwing/Workspace';
  constructor(private directoryService: DirectoryService) {}

  exit(): void {
    this.path = this.directory.parent;
    this.getDirectory();
  }

  enter(filename: string): void {
    console.log('Directory Click');
    this.path = this.directory.path + '/' + filename;
    this.getDirectory();
  }

  close(): void {
    this.isShow = false;
  }

  getDirectory(): void {
    this.directoryService
      .getDirectory(this.path)
      .then(res => {
        this.directory = res;
        this.isShow = true;
      })
      .catch(this.directoryService.handleError);
  }

  ngOnInit(): void {
    this.getDirectory();
  }
}
