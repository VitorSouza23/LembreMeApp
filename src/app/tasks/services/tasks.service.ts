import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment'
import TaskBuilder from '../models/task-builder.model';
import Task, { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly API: string;

  private taskChangeStatus = new Subject<Task>();
  public taskChangeStatus$ = this.taskChangeStatus.asObservable();
  private taskDeleted = new Subject<Task>();
  public taskDeleted$ = this.taskDeleted.asObservable();
  private newTaksAdded = new Subject<Task>();
  public newTaskAdded$ = this.newTaksAdded.asObservable();
  private updateTaskData = new Subject<Task>();
  public updateTaskData$ = this.updateTaskData.asObservable();
  private getPendingTasksSubject = new Subject<Task[]>();
  public getPendingTasksSubject$ = this.getPendingTasksSubject.asObservable();
  private getPendingTasksWithDeadline = new Subject<Task[]>();
  public getPendingTasksWithDeadline$ = this.getPendingTasksWithDeadline.asObservable();
  private getCompletedTasksSubject = new Subject<Task[]>();
  public getCompletedTasksSubject$ = this.getCompletedTasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.API = `${environment.API}/api/v1/tasks`;
  }

  getPendingTasks(): void {
    this.http.get<ITask[]>(`${this.API}?onlyNotCompleted=true`)
      .subscribe(data => {
        let tasks = data.map(t => TaskBuilder.createTask(t));
    
        let pendingTasksWithDeadline = tasks.filter(t => (t.deadline != null));
        this.getPendingTasksWithDeadline.next(pendingTasksWithDeadline);

        let pendingTasks = tasks.filter(t => (t.deadline == null));
        this.getPendingTasksSubject.next(pendingTasks);
      });
  }

  getCompletedTasks(): void {
    this.http.get<ITask[]>(`${this.API}?onlyCompleted=true`)
      .subscribe(data => {
        let tasks = data.map(t => TaskBuilder.createTask(t));
        this.getCompletedTasksSubject.next(tasks);
      });
  }

  completeTask(task: Task): void {
    this.http.patch<boolean>(`${this.API}/${task.id}?completed=true`, {})
      .subscribe(result => {
        if (result) {
          task.completed = true;
          this.taskChangeStatus.next(task);
        }
      });
  }

  uncompleteTask(task: Task): void {
    this.http.patch<boolean>(`${this.API}/${task.id}?completed=false`, {})
      .subscribe(result => {
        if (result) {
          task.completed = false;
          this.taskChangeStatus.next(task);
        }
      });
  }

  deleteTask(task: Task): void {
    this.http.delete<boolean>(`${this.API}/${task.id}`)
      .subscribe(result => {
        if (result) {
          this.taskDeleted.next(task);
        }
      })
  }

  addTask(task: Task): void {
    this.http.post<number>(this.API, task)
      .subscribe(newId => {
        task.id = newId;
        this.newTaksAdded.next(task);
      })
  }

  updateTask(task: Task): void {
    this.http.put<boolean>(`${this.API}/${task.id}`, task)
      .subscribe(result => {
        if (result) {
          this.updateTaskData.next(task);
        }
      });
  }
}
