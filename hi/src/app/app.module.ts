import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';

import {
  MenuItem,
  TreeModule,
  AccordionModule,
  ButtonModule,
  InputTextModule,
  InputTextareaModule,
  TabViewModule,
  ToolbarModule
} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { TextEditorComponent } from './texteditor.component';
// import { FileComponent } from './explorer/file.component';
import { FileSystemService } from './explorer/fileSystem.service';
import { FileService } from './explorer/file.service';
import { DirectoryComponent } from './explorer/directory.component';
// import { DirectoryService } from './directory.service';
// import { TextEditorService } from './texteditor.service';

@NgModule({
  declarations: [
    AppComponent,
    DirectoryComponent,
    // FileComponent,
    TextEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    TreeModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    TabViewModule,
    ToolbarModule
  ],
  providers: [
    FileSystemService,
    FileService,
    // TextEditorService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
