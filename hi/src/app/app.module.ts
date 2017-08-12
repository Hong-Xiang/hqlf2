import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DirectoryComponent } from './directory.component';
import { FileComponent } from './file.component';
import { TextEditorComponent } from './texteditor.component';

import { FileSystemService } from './fileSystem.service';

import { FileService } from './file.service';
import { DirectoryService } from './directory.service';
import { TextEditorService } from './texteditor.service';

@NgModule({
  declarations: [
    AppComponent,
    DirectoryComponent,
    FileComponent,
    TextEditorComponent
  ],
  imports: [BrowserModule, FormsModule, HttpModule, HttpClientModule],
  providers: [
    FileSystemService,
    FileService,
    DirectoryService,
    TextEditorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
