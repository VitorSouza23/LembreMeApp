import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import ITask from '../../models/task.model';
import IIconButton from '../models/icon-button-model';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ListViewComponent implements OnInit {

  @Input() tasks: ITask[];
  @Input() title: string;
  @Input() buttons: IIconButton[];

  constructor() {
    this.buttons = this.buttons ?? [];
  }

  ngOnInit(): void {
  }

}
