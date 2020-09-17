import { Component, OnInit } from '@angular/core';
import IIconButton from '../common/models/icon-button-model';
import ITask from '../models/task.model';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.less']
})
export class CompletedComponent implements OnInit {

  public tasks: ITask[];
  public buttonsActions: IIconButton [];

  constructor() {
    this.buttonsActions = [
      { title: 'Restaurar', iconName: 'settings_backup_restore', onClick: e => console.log('ta fumegano') },
      { title: 'Excluir', iconName: 'delete_outline', onClick: e => console.log('ta fumegano') },
    ]
   }

  ngOnInit(): void {
    this.tasks = [
      { description: "Teste 5", completed: true },
      { description: "Teste 6", completed: true },
      { description: "Teste 4", completed: true }
    ]
  }

}
