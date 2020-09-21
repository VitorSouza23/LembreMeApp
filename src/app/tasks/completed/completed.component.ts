import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
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

  public completedTasks: Observable<Task[]>;
  public buttonsActions: IIconButton[];

  constructor(private tasksService: TasksService, private snackBar: MatSnackBar,
    private taskDialogService: TaskDialogService) {
    this.createButtons();
    this.subscribeOnTasksChanges();
    this.subscribeOnTaskDeleted();
    this.subscribeOnTaskUpdateData();
  }

  ngOnInit(): void {
    this.completedTasks = this.tasksService.getCompletedTasks();
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
        this.completedTasks.subscribe(tasks => tasks.push(task));
      } else {
        this.completedTasks.subscribe(tasks => this.spliceTask(tasks, task))
      }
    });
  }

  private subscribeOnTaskDeleted(): void {
    this.tasksService.taskDeleted$.subscribe(task => {
      if (task.completed) {
        this.completedTasks.subscribe(tasks => this.spliceTask(tasks, task));
      }
    });
  }

  private subscribeOnTaskUpdateData(): void {
    this.tasksService.updateTaskData$.subscribe(([oldTask, newTask]) => {
      this.completedTasks.subscribe(tasks => {
        let index = tasks.indexOf(oldTask);
        tasks[index] = newTask;
      })
    });
  }

  private spliceTask(tasks: Task[], task: Task){
    let index = tasks.indexOf(task);
    tasks.splice(index, 1);
  }

  uncompleteTaks(task: Task): void {
    this.tasksService.uncompleteTask(task.id);
    this.openSnackBar(`Tarefa ${task.description} restaurada.`);
  }

  deleteTask(task: Task): void {
    this.tasksService.deleteTask(task.id);
    this.openSnackBar(`Tarefa ${task.description} excluída.`);
  }

  openSnackBar(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  editTask(task: Task): void {
    this.taskDialogService.openDialog(task, result => {
      if(result.dialogOption === DialogOption.Confirm){
        this.tasksService.updateTask(result.task);
        this.openSnackBar(`A tarefa ${result.task.description} foi alterada.`);
      }
    })
  }

}
