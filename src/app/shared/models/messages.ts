interface IMessage {
	message: string;
	userId: number;
	userName?: string;
}

export class Message implements IMessage {
	constructor(public message: string, public userId: number, public userName?: string) {}
}
