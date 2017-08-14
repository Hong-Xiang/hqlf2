// import { Component, Input, Output, OnDestroy } from '@angular/core';

// import { TreeNode } from 'primeng/primeng';

// import { Directory } from './directory';
// import { DirectoryService } from './directory.service';
// import { Subscription } from 'rxjs/Subscription';

// @Component({
//   selector: 'app-directory',
//   templateUrl: './directory.component.html',
//   styleUrls: ['./directory.component.css']
// })
// export class DirectoryComponent implements OnDestroy {
//   directory: Directory;
//   subscription: Subscription;
//   is_span: true;

//   constructor(private directoryService: DirectoryService) {
//     // this.directory = this.directoryService.directory;
//     this.subscription = this.directoryService.directoryOpened$.subscribe(
//       directory => (this.directory = directory)
//     );
//   }

//   debug() {
//     console.log(this.directory);
//   }
//   openDirectory(path: string) {
//     this.directoryService.openDirectory(path);
//   }

//   exitDirectory(): void {
//     this.directoryService.exit(this.directory);
//   }

//   // close(): void {
//   //   this.directoryService.isShow = false;
//   // }

//   // get(): void {
//   //   this.directoryService.get(
//   //     this.path,
//   //     (newDirectory: Directory) => (this.directory = newDirectory)
//   //   );
//   // }

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
// }
