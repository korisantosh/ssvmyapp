import { TaskDetailsComponent } from './mywork/task-details/task-details.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { MyworkComponent } from "./mywork/mywork.component";
import { OthersComponent } from "./others/others.component";
import { WorklogComponent } from './worklog/worklog.component';
import { WorklogaddComponent } from './worklogadd/worklogadd.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'ticket/:id',
    component: WorklogComponent
  },
  {
    path: 'ticket/:id/add',
    component: WorklogaddComponent
  },
  {
    path: 'mywork',
    component: MyworkComponent
  },
  {
    path: 'mywork/:id',
    component: TaskDetailsComponent
  },
  {
    path: 'others',
    component: OthersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
