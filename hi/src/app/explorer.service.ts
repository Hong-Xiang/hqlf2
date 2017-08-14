// import { Injectable, OnInit } from '@angular/core';
// import { Subject } from 'rxjs/Subject';

// import { File } from './file';
// import { Directory } from './directory';
// import { FileSystemService } from './fileSystem.service';

// @Injectable()
// export class ExplorerService {
//   private fileSource = new Subject<File>();
//   private directorySource = new Subject<Directory>();

//   fileOpened$ = this.fileSource.asObservable();
//   directoryOpened$ = this.directorySource.asObservable();

//   constructor(private fileSystemService: FileSystemService) {}

//   openFile(file: File): void {
//     this.fileSource.next(file);
//   }

//   openFileAsDirectory(file: File) {
//     this.directorySource.next(this.fileSystemService.getDirectory(file.path));
//   }

//   openDirectory(directory: Directory) {
//     this.directorySource.next(directory);
//   }
// }
