import ILocation from './location.model';

interface ITask {
    description: string;
    completed: boolean;
    timeToConclusion?: Date;
    location?: ILocation;
}

export default ITask;