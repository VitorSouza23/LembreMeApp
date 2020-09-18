import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ITask from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  //TODO: Remover quando não for mais necessário.
  private fakeTasks: ITask[];

  constructor() {
    this.fakeTasks = [
      //Sem prazo
      { 
        description: "Teste 1", 
        completed: false 
      },
      {
        description: "Teste 2 ", 
        completed: false, 
        location: {
          city: "Cidade 2",
          federativeUnit: "SC",
          neighborhood: "Bairro 2",
          number: 2,
          street: "Rua 2"
        }
      },
      {
        description: "Teste 3", 
        completed: false, 
        location: {
          city: "Cidade 3",
          federativeUnit: "SC",
          neighborhood: "Bairro 3",
          number: 3,
          street: "Rua 3"
        }
      },
      //Com prazo
      { 
        description: "Teste 4", 
        completed: false,
        deadline: new Date(2020, 11, 4)
      },
      {
        description: "Teste 5", 
        completed: false, 
        location: {
          city: "Cidade 5",
          federativeUnit: "SC",
          neighborhood: "Bairro 5",
          number: 5,
          street: "Rua 5"
        },
        deadline: new Date(2020, 11, 5)
      },
      {
        description: "Teste 6", 
        completed: false, 
        location: {
          city: "Cidade 6",
          federativeUnit: "SC",
          neighborhood: "Bairro 6",
          number: 6,
          street: "Rua 6"
        },
        deadline: new Date(2020, 11, 6)
      },
      //Completadas
      { 
        description: "Teste 7", 
        completed: true,
        deadline: new Date(2020, 11, 4)
      },
      {
        description: "Teste 8", 
        completed: true, 
        location: {
          city: "Cidade 8",
          federativeUnit: "SC",
          neighborhood: "Bairro 8",
          number: 8,
          street: "Rua 8"
        },
      },
      {
        description: "Teste 9", 
        completed: true, 
        location: {
          city: "Cidade 9",
          federativeUnit: "SC",
          neighborhood: "Bairro 9",
          number: 9,
          street: "Rua 9"
        },
        deadline: new Date(2020, 11, 9)
      },
    ]
  }

  getPendingTasks(withDeadline = true): Observable<ITask[]> {
      let pendingTasks = this.fakeTasks.filter(t => t.completed === false);

      if(withDeadline) {
        pendingTasks = pendingTasks.filter(t => (t.deadline != null) && (t.deadline != undefined));
      } else {
        pendingTasks = pendingTasks.filter(t => (t.deadline == null) || (t.deadline == undefined));
      }

      return new Observable<ITask[]>(o => o.next(pendingTasks));
  }

  getCompletedTasks(): Observable<ITask[]> {
    let completedTasks = this.fakeTasks.filter(t => t.completed);
    return new Observable<ITask[]>(o => o.next(completedTasks));
  }
}
