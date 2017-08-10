import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DirectoryComponent } from './directory.component';
import { FileComponent } from './file.component';
import { DirectoryService } from './directory.service';

@NgModule({
  declarations: [AppComponent, DirectoryComponent, FileComponent],
  imports: [BrowserModule, FormsModule, HttpModule],
  providers: [DirectoryService],
  bootstrap: [AppComponent]
})
export class AppModule {}
