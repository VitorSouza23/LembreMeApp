import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Task from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  //TODO: Remover quando não for mais necessário.
  private fakeTasks: Task[];

  private taskChangeStatus = new Subject<Task>();
  public taskChangeStatus$ = this.taskChangeStatus.asObservable();
  private taskDeleted = new Subject<Task>();
  public taskDeleted$ = this.taskDeleted.asObservable();
  private newTaksAdded = new Subject<Task>();
  public newTaskAdded$ = this.newTaksAdded.asObservable();

  constructor() {
    this.fakeTasks = [
      //Sem prazo
      new Task(1, "Teste 1", false),
      new Task(2, "Teste 2 ", false, undefined, {
        city: "Cidade 2",
        federativeUnit: "SC",
        neighborhood: "Bairro 2",
        number: 2,
        street: "Rua 2"
      }),
      new Task(3, "Teste 3", false, undefined, {
        city: "Cidade 3",
        federativeUnit: "SC",
        neighborhood: "Bairro 3",
        number: 3,
        street: "Rua 3"
      }),
      //Com prazo
      new Task(4, "Teste 4", false, new Date(2020, 11, 4)),
      new Task(5, "Teste 5", false, new Date(2020, 11, 5), {
        city: "Cidade 5",
        federativeUnit: "SC",
        neighborhood: "Bairro 5",
        number: 5,
        street: "Rua 5"
      }),
      new Task(6, "Teste 6", false, new Date(2020, 11, 6), {
        city: "Cidade 6",
        federativeUnit: "SC",
        neighborhood: "Bairro 6",
        number: 6,
        street: "Rua 6"
      }),
      //Completadas
      new Task(7, "Teste 7", true),
      new Task(8, "Teste 8", true, undefined, {
        city: "Cidade 8",
        federativeUnit: "SC",
        neighborhood: "Bairro 8",
        number: 8,
        street: "Rua 8"
      }),
      new Task(9, "Teste 9", true, new Date(2020, 11, 9), {
        city: "Cidade 9",
        federativeUnit: "SC",
        neighborhood: "Bairro 9",
        number: 9,
        street: "Rua 9"
      })
    ]
  }

  getPendingTasks(withDeadline = true): Observable<Task[]> {
      let pendingTasks = this.fakeTasks.filter(t => t.completed === false);

      if(withDeadline) {
        pendingTasks = pendingTasks.filter(t => (t.deadline != null) && (t.deadline != undefined));
      } else {
        pendingTasks = pendingTasks.filter(t => (t.deadline == null) || (t.deadline == undefined));
      }

      return new Observable<Task[]>(o => o.next(pendingTasks));
  }

  getCompletedTasks(): Observable<Task[]> {
    let completedTasks = this.fakeTasks.filter(t => t.completed);
    return new Observable<Task[]>(o => o.next(completedTasks));
  }

  completeTask(taksId: number): boolean {
    let task = this.fakeTasks.find(t => t.id === taksId);
    if(task) {
        task.completed = true;
        this.taskChangeStatus.next(task);
        return true;
    }
    return false;
  }

  uncompleteTask(taksId: number): boolean {
    let task = this.fakeTasks.find(t => t.id === taksId);
    if(task) {
        task.completed = false;
        this.taskChangeStatus.next(task);
        return true;
    }
    return false;
  }

  deleteTask(taskId: number): boolean {
    let task = this.fakeTasks.find(t => t.id == taskId);
    if(task){
      let index = this.fakeTasks.indexOf(task);
      this.fakeTasks.splice(index, 1);
      this.taskDeleted.next(task);
      return true;
    }
    return false;
  }

  addTask(task: Task): Task {
    let lastTask = this.fakeTasks[this.fakeTasks.length -1];
    let newId = lastTask?.id ?? 1;
    task.id = newId;
    this.fakeTasks.push(task);
    this.newTaksAdded.next(task);
    return task;
  }
}
