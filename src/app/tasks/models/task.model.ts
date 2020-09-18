import ILocation from './location.model';

interface ITask {
    description: string;
    completed: boolean;
    deadline?: Date;
    location?: ILocation;
}

export default ITask;