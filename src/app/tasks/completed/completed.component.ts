import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { DialogOption } from '../common/models/dialog-reuslt.models';
import IIconButton from '../common/models/icon-button-model';
import Task from '../models/task.model';
import { TaskDialogService } from '../services/task-dialog.service';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.less']
})
export class CompletedComponent implements OnInit {

  public completedTasks: Task[];
  public buttonsActions: IIconButton[];

  public loading$ = new Subject<boolean>();

  constructor(private tasksService: TasksService, private snackBar: MatSnackBar,
    private taskDialogService: TaskDialogService) {
    this.createButtons();
    this.subscribeOnTasksChanges();
    this.subscribeOnTaskDeleted();
    this.subscribeOnTaskUpdateData();
    this.subscribeOnGetCompletedTasks();
  }

  ngOnInit(): void {
    this.tasksService.getCompletedTasks();
    this.loading$.next(true);
  }

  private createButtons(): void {
    this.buttonsActions = [
      { title: 'Restaurar', iconName: 'settings_backup_restore', onClick: task => this.uncompleteTaks(task) },
      { title: 'Excluir', iconName: 'delete_outline', onClick: task => this.deleteTask(task) },
    ];
  }

  private subscribeOnTasksChanges(): void {
    this.tasksService.taskChangeStatus$.subscribe(task => {
      if (task.completed) {
        this.completedTasks.push(task);
      } else {
        this.spliceTask(this.completedTasks, task);
      }
    });
  }

  private subscribeOnTaskDeleted(): void {
    this.tasksService.taskDeleted$.subscribe(task => {
      if (task.completed) {
        this.spliceTask(this.completedTasks, task);
      }
    });
  }

  private subscribeOnTaskUpdateData(): void {
    this.tasksService.updateTaskData$.subscribe(updatedTask => {
      let taskInArray = this.completedTasks.find(t => t.id === updatedTask.id);
      if (taskInArray) {
        let index = this.completedTasks.indexOf(taskInArray);
        this.completedTasks[index] = updatedTask;
      }
    });
  }

  private subscribeOnGetCompletedTasks(): void {
    this.tasksService.getCompletedTasksSubject$.subscribe(tasks => {
      this.completedTasks = tasks;
      this.loading$.next(false);
    });
  }

  private spliceTask(tasks: Task[], task: Task) {
    let index = tasks.indexOf(task);
    tasks.splice(index, 1);
  }

  uncompleteTaks(task: Task): void {
    this.tasksService.uncompleteTask(task);
    this.openSnackBar(`Tarefa ${task.description} restaurada.`);
  }

  deleteTask(task: Task): void {
    this.tasksService.deleteTask(task);
    this.openSnackBar(`Tarefa ${task.description} excluída.`);
  }

  openSnackBar(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  editTask(task: Task): void {
    this.taskDialogService.openDialog(task.clone(), result => {
      if (result.dialogOption === DialogOption.Confirm) {
        this.tasksService.updateTask(result.task);
        this.openSnackBar(`A tarefa ${result.task.description} foi alterada.`);
      }
    })
  }

}
