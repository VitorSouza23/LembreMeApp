import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import IIconButton from '../common/models/icon-button-model';
import Task from '../models/task.model';
import { TaskDialogService } from '../services/task-dialog.service';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.less']
})
export class PendingComponent implements OnInit {

  public pendingTasksWithDeadline: Observable<Task[]>;
  public pendingTasks: Observable<Task[]>;
  public buttonsActions: IIconButton[];

  constructor(
    private tasksService: TasksService, 
    private snackBar: MatSnackBar, 
    private taskDialogService: TaskDialogService) {
    this.createButtons();
    this.subscribeOnTasksChanges();
    this.subscribeOnTaksDeleted();
    this.subscribeOnTaskAdded();
  }

  ngOnInit(): void {
    this.pendingTasks = this.tasksService.getPendingTasks(false);
    this.pendingTasksWithDeadline = this.tasksService.getPendingTasks();
  }

  private createButtons(): void {
    this.buttonsActions = [
      { title: 'Confirmar', iconName: 'done_outline', onClick: task => this.completeTask(task) },
      { title: 'Excluir', iconName: 'delete_outline', onClick: task => this.deleteTaks(task) },
    ];
  }

  private subscribeOnTasksChanges(): void {
    this.tasksService.taskChangeStatus$.subscribe(task => {
      if (task.completed === false) {
        if (task.deadline) {
          this.pendingTasksWithDeadline.subscribe(tasks => tasks.push(task));
        } else {
          this.pendingTasks.subscribe(tasks => tasks.push(task));
        }
      } else {
        if (task.deadline) {
          this.pendingTasksWithDeadline.subscribe(tasks => this.spliceTask(tasks, task));
        } else {
          this.pendingTasks.subscribe(tasks => this.spliceTask(tasks, task));
        }
      }
    });
  }

  private subscribeOnTaksDeleted(): void {
    this.tasksService.taskDeleted$.subscribe(task => {
      if (task.completed === false) {
        if (task.deadline) {
          this.pendingTasksWithDeadline.subscribe(tasks => this.spliceTask(tasks, task));
        } else {
          this.pendingTasks.subscribe(tasks => this.spliceTask(tasks, task));
        }
      }
    });
  }

  private subscribeOnTaskAdded(): void {
    this.tasksService.newTaskAdded$.subscribe(task => {
      if(task.deadline) {
        this.pendingTasksWithDeadline.subscribe(tasks => {
          tasks.push(task);
        });
      } else {
        this.pendingTasks.subscribe(tasks => {
          tasks.push(task);
        });
      }
    });
  }

  private spliceTask(tasks: Task[], task: Task){
    let index = tasks.indexOf(task);
    tasks.splice(index, 1);
  }

  completeTask(task: Task): void {
    this.tasksService.completeTask(task.id);
    this.openSnackBar(`Tarefa ${task.description} completada.`);
  }

  deleteTaks(task: Task): void {
    this.tasksService.deleteTask(task.id);
    this.openSnackBar(`Tarefa ${task.description} excluída.`);
  }

  openSnackBar(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  newTask() : void {
    let task = new Task(0, '', false);
    this.taskDialogService.openDialog(task, result => {
      this.tasksService.addTask(result);
      this.openSnackBar(`A tarefa ${result.description} foi adicionada.`);
    });
  }

}
