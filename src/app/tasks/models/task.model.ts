import ILocation from './location.model';

class Task {
    public id: number;
    public description: string;
    public completed: boolean;
    public deadline?: Date;
    public location?: ILocation;

    constructor(id: number, description: string, completed: boolean, deadline? : Date, location?: ILocation) {
        this.id = id;
        this.description = description;
        this.completed = completed;
        this.deadline = deadline;
        this.location = location;
    }

    clone(): Task {
        let clone = Object.create(this);
        if(this.location){
            (clone as Task).location = Object.create(this.location);
        }
        return clone;
    }

    formattedDeadline(): string {
        return this.deadline?.toLocaleDateString("pt-BR", {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute:'numeric', second:'numeric'});
    }

    formattedLocation(): string {
        if(this.location){
            return `Rua: ${this.location.street}, Nº: ${this.location.number}, Bairro: ${this.location.neighborhood}, Cidade: ${this.location.city}, UF: ${this.location.federativeUnit}`;
        }
        return "";
    }
}

export default Task;