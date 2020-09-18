import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { PendingComponent } from './pending/pending.component';
import { ListViewComponent } from './common/list-view/list-view.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CompletedComponent } from './completed/completed.component';
import { TasksService } from './services/tasks.service';


@NgModule({
  declarations: [TasksListComponent, PendingComponent, ListViewComponent, CompletedComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    TasksService
  ]
})
export class TasksModule { }
