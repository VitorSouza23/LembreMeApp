import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { DialogOption } from '../common/models/dialog-reuslt.models';
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

  public pendingTasksWithDeadline: Task[];
  public pendingTasks: Task[];
  public buttonsActions: IIconButton[];

  public loading$ = new Subject<boolean>();

  constructor(
    private tasksService: TasksService, 
    private snackBar: MatSnackBar, 
    private taskDialogService: TaskDialogService) {
    this.createButtons();
    this.subscribeOnTasksChanges();
    this.subscribeOnTaksDeleted();
    this.subscribeOnTaskAdded();
    this.subscribeOnTaskUpdateData();
    this.subscribeOnGetPendingsTasks();
  }

  ngOnInit(): void {
    this.tasksService.getPendingTasks();
    this.loading$.next(true);
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
          this.pendingTasksWithDeadline.push(task);
        } else {
          this.pendingTasks.push(task);
        }
      } else {
        if (task.deadline) {
          this.spliceTask(this.pendingTasksWithDeadline, task);
        } else {
          this.spliceTask(this.pendingTasks, task);
        }
      }
    });
  }

  private subscribeOnTaksDeleted(): void {
    this.tasksService.taskDeleted$.subscribe(task => {
      if (task.completed === false) {
        if (task.deadline) {
          this.spliceTask(this.pendingTasksWithDeadline, task);
        } else {
          this.spliceTask(this.pendingTasks, task);
        }
      }
    });
  }

  private subscribeOnTaskAdded(): void {
    this.tasksService.newTaskAdded$.subscribe(task => {
      if(task.deadline) {
        this.pendingTasksWithDeadline.push(task);
      } else {
        this.pendingTasks.push(task);
      }
    });
  }

  private subscribeOnTaskUpdateData(): void {
    this.tasksService.updateTaskData$.subscribe(updatedTask => {
      this.spliceTask(this.pendingTasksWithDeadline, updatedTask);
      this.spliceTask(this.pendingTasks, updatedTask);

      if(updatedTask.deadline){
        this.pendingTasksWithDeadline.push(updatedTask);
      } else {
        this.pendingTasks.push(updatedTask);
      }
    })
  }

  private subscribeOnGetPendingsTasks(): void {
    this.tasksService.getPendingTasksSubject$.subscribe(tasks => {
      this.pendingTasks = tasks;
      this.loading$.next(false);
    });
    this.tasksService.getPendingTasksWithDeadline$.subscribe(tasks => {
      this.pendingTasksWithDeadline = tasks;
      this.loading$.next(false);
    });
  }

  private spliceTask(tasks: Task[], task: Task){
    let taskInArray = tasks.find(t => t.id === task.id);
    if(taskInArray) {
      let index = tasks.indexOf(taskInArray);
      tasks.splice(index, 1);
    }
  }

  completeTask(task: Task): void {
    this.tasksService.completeTask(task);
    this.openSnackBar(`Tarefa ${task.description} completada.`);
  }

  deleteTaks(task: Task): void {
    this.tasksService.deleteTask(task);
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
      if(result.dialogOption === DialogOption.Confirm){
        this.tasksService.addTask(result.task);
        this.openSnackBar(`A tarefa ${result.task.description} foi adicionada.`);
      }
    });
  }

  editTask(task: Task): void {
    this.taskDialogService.openDialog(task.clone(), result => {
      if(result.dialogOption === DialogOption.Confirm){
        this.tasksService.updateTask(result.task);
        this.openSnackBar(`A tarefa ${result.task.description} foi alterada.`);
      }
    })
  }
}
