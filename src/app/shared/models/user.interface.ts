interface IUser {
    id?: number;
    name: string;
}

export class User implements IUser {
    constructor(
        public name: string,
        public id?: number
    ) {}
}

