import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import IIconButton from '../common/models/icon-button-model';
import ITask from '../models/task.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.less']
})
export class PendingComponent implements OnInit {

  public pendingTasksWithDeadline: Observable<ITask[]>;
  public pendingTasks: Observable<ITask[]>;
  public buttonsActions: IIconButton [];

  constructor(private tasksService: TasksService) {
    this.buttonsActions = [
      { title: 'Confirmar', iconName: 'done_outline', onClick: e => console.log('ta fumegano') },
      { title: 'Excluir', iconName: 'delete_outline', onClick: e => console.log('ta fumegano') },
    ]
  }

  ngOnInit(): void {
    this.pendingTasks = this.tasksService.getPendingTasks(false);
    this.pendingTasksWithDeadline = this.tasksService.getPendingTasks();
  }

}
