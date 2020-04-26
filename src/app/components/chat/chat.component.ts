import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from '../../shared/models/messages';
import { MessagesService } from '../../shared/services/messages.service';
import { FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.interface';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
	@Input() enableInput: boolean;
	public messages: Message[];
	private users: User[];
	public messageFormControl: FormControl;
	constructor(public db: AngularFirestore, public ms: MessagesService, public us: UsersService) {}

	ngOnInit(): void {
		this.messageFormControl = new FormControl('', [Validators.required]);
		this.us.getUsers().subscribe(users => {
			this.users = users;
		});

		this.db
			.collection('messages')
			.get()
			.subscribe(items => {
				this.messages = items.docs.map<Message>(doc => new Message(doc.data().message, doc.data().userId));
				this.updateMessages();
			});

		this.db
			.collection('messages')
			.valueChanges()
			.subscribe((items: Message[]) => {
				this.messages = items;
				this.updateMessages();
			});

		// this.ms.getObservable().subscribe(x => this.deleteMessages());
	}

	deleteMessages() {
		this.ms.deleteMessages().subscribe(resp => {
			console.log('De eliminaron los mensasjes', resp);
		});
	}

	sendMessage() {
		console.log(this.us.getUser());
		this.ms.sendMessages(new Message(this.messageFormControl.value, this.us.getUser().id)).subscribe(x => {
			this.messageFormControl.setValue('');
		});
	}

	private updateMessages() {
		this.messages.map(msj => {
			msj.userName = this.users.find(user => user.id === msj.userId).name;
		});
	}
}
