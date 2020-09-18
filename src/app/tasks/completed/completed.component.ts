import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import IIconButton from '../common/models/icon-button-model';
import Task from '../models/task.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.less']
})
export class CompletedComponent implements OnInit {

  public completedTasks: Observable<Task[]>;
  public buttonsActions: IIconButton[];

  constructor(private tasksService: TasksService, private snackBar: MatSnackBar) {
    this.createButtons();
    this.subscribeOnTasksChanges();
    this.subscribeOnTaskDeleted();
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

}
