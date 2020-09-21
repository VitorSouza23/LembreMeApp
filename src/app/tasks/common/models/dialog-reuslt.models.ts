import Task from "../../models/task.model";

export interface IDialogResult {
    task: Task,
    dialogOption: DialogOption
}

export enum DialogOption {
    Confirm,
    Cancel
}