import { Component, OnInit } from '@angular/core';
import Task from '../models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.less']
})
export class TasksListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
