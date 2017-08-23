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
  ToolbarModule,
  SliderModule
} from 'primeng/primeng';
import { RESTfulService } from './restful.service';
import { AppComponent } from './app.component';
import { FileSystemService } from './file/fileSystem.service';
import { FileService } from './file/file.service';
import { DirectoryComponent } from './explorer/directory.component';
import { TextEditorComponent } from './textEditor/textEditor.component';
import { TextEditorService } from './textEditor/textEditor.service';
import { TaskService } from './task/task.service';
import { Image3DComponent } from './image3d/image3d.component';
import { Image3DService } from './image3d/image3d.service';
import { ViewComponent } from './image3d/view.component';
import { SlidersComponent } from './image3d/slider.component';
import { SlidersService } from './image3d/slider.service';
// import { ImageComponent } from './image3d/image.component';
// import { ImageService } from './image3d/image.service';
@NgModule({
  declarations: [
    AppComponent,
    DirectoryComponent,
    TextEditorComponent,
    Image3DComponent,
    ViewComponent,
    SlidersComponent
    // ImageComponent
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
    ToolbarModule,
    SliderModule
  ],
  providers: [
    FileSystemService,
    FileService,
    TextEditorService,
    TaskService,
    Image3DService,
    // ImageService,
    RESTfulService,
    SlidersService
    // TextEditorService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
