import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialogResult } from '../common/models/dialog-reuslt.models';
import Task from '../models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';

@Injectable({
  providedIn: 'root'
})
export class TaskDialogService {

  constructor(public dialog: MatDialog) { }

  openDialog(task: Task, afterClosed: (result: IDialogResult) => void = result => { }): void {
    const dialogRef = this.dialog.open<TaskFormComponent, Task, IDialogResult>(TaskFormComponent, {
      width: '400px',
      data: task,
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(afterClosed);
  }
}
