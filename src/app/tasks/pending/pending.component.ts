import { Component, OnInit } from '@angular/core';
import IIconButton from '../common/models/icon-button-model';
import ITask from '../models/task.model';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.less']
})
export class PendingComponent implements OnInit {

  public tasks: ITask[];
  public buttonsActions: IIconButton [];

  constructor() {
    this.buttonsActions = [
      { title: 'Confirmar', iconName: 'done_outline', onClick: e => console.log('ta fumegano') },
      { title: 'Excluir', iconName: 'delete_outline', onClick: e => console.log('ta fumegano') },
    ]
  }

  ngOnInit(): void {
    this.tasks = [
      { description: "Teste 1", completed: false },
      { description: "Teste 2", completed: false },
      { description: "Teste 2", completed: false }
    ]
  }

}
