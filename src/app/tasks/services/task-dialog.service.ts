import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Task from '../models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';

@Injectable({
  providedIn: 'root'
})
export class TaskDialogService {

  constructor(public dialog: MatDialog) { }

  openDialog(task: Task, afterClosed: (task: Task) => void = result => { }): void {
    const dialogRef = this.dialog.open<TaskFormComponent, Task, Task>(TaskFormComponent, {
      width: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe(afterClosed);
  }
}
