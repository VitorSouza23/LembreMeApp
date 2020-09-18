import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import IIconButton from '../common/models/icon-button-model';
import ITask from '../models/task.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.less']
})
export class CompletedComponent implements OnInit {

  public completedTasks: Observable<ITask[]>;
  public buttonsActions: IIconButton [];

  constructor(private tasksService: TasksService) {
    this.buttonsActions = [
      { title: 'Restaurar', iconName: 'settings_backup_restore', onClick: e => console.log('ta fumegano') },
      { title: 'Excluir', iconName: 'delete_outline', onClick: e => console.log('ta fumegano') },
    ]
   }

  ngOnInit(): void {
    this.completedTasks = this.tasksService.getCompletedTasks();
  }

}
