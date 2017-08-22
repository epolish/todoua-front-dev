import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DndModule } from 'ng2-dnd';
import { AppComponent } from './app/app.component';
import { AppService, InMemoryDataService } from './shared';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ProjectComponent } from './project/project.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    DndModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 })
  ],
  providers: [
    AppService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ProjectComponent]
})
export class AppModule { }