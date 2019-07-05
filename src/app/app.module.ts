import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyworkComponent } from './mywork/mywork.component';
import { OthersComponent } from './others/others.component';
import { TasksComponent } from './mywork/tasks/tasks.component';
import { TaskDetailsComponent } from './mywork/task-details/task-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorklogComponent } from './worklog/worklog.component';
import { WorklogaddComponent } from './worklogadd/worklogadd.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MyworkComponent,
    OthersComponent,
    TasksComponent,
    TaskDetailsComponent,
    WorklogComponent,
    WorklogaddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
