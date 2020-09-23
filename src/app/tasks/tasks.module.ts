import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
import { TaskFormComponent } from './task-form/task-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TaskDialogService } from './services/task-dialog.service';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [TasksListComponent, PendingComponent, ListViewComponent, CompletedComponent, TaskFormComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    TasksService,
    TaskDialogService
  ]
})
export class TasksModule { }
