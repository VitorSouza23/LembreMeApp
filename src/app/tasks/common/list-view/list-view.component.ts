import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import Task from '../../models/task.model';
import IIconButton from '../models/icon-button-model';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ListViewComponent implements OnInit {

  @Input() tasks: Task[];
  @Input() title: string;
  @Input() buttons: IIconButton[];

  @Output() onEdit = new EventEmitter<Task>();

  constructor() {
    this.buttons = this.buttons ?? [];
  }

  ngOnInit(): void {
  }

  editTaks(task: Task): void {
    this.onEdit.emit(task);
  }

}
