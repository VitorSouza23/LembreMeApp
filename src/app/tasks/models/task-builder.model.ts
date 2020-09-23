import Task, { ITask } from "./task.model";

class TaskBuilder {
    public static createTask(data: ITask): Task {
        let deadline: Date = null;

        if(typeof(data.deadline) === "string"){
            deadline = new Date(data.deadline);
        }

        return new Task(data.id, 
            data.description, data.completed, deadline, data.location);
    }
}

export default TaskBuilder;