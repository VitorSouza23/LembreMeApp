import Task from '../../models/task.model';

interface IIconButton {
    iconName: string;
    title: string;
    onClick(task: Task): void; 
}

export default IIconButton;