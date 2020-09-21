import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogOption, IDialogResult } from '../common/models/dialog-reuslt.models';
import Task from '../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.less']
})
export class TaskFormComponent implements OnInit {

  public form: FormGroup;
  public enableDeadline: boolean;
  public enableLocation: boolean;

  constructor(public dialogRef: MatDialogRef<TaskFormComponent, IDialogResult>,
    @Inject(MAT_DIALOG_DATA) public task: Task) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      taksDescription: new FormControl()
    });
    this.enableDeadline = this.task.deadline != null;
    this.enableLocation = this.task.location != null;
  }

  onNoClick(): void {
    this.dialogRef.close({task: undefined, dialogOption: DialogOption.Cancel});
  }

  onConfirm(): void {
    if(this.form.valid){
      this.dialogRef.close({task: this.task , dialogOption: DialogOption.Confirm});
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        if(control instanceof FormControl) {
          control.markAllAsTouched();
        }
      });
    }
  }

  onEnableLoationChange(){
    if(this.enableLocation){
      this.task.location = {
        number: 0,
        street: '',
        city: '',
        neighborhood: '',
        federativeUnit: ''
      };
    } else {
      this.task.location = null;
    }
  }

  onEnableDeadline() {
    if(this.enableDeadline === false){
      this.task.deadline = null;
    } else {
      this.task.deadline = new Date();
    }
  }

  onDeadlineChange($event: any) : void{
    this.task.deadline = new Date($event);
  }
}
