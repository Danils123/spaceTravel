import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";
import * as express from "express";

const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://asterius-f1308.firebaseio.com",
});

const app = express();
const db = admin.firestore();

app.use(cors({ origin: true }));

// Automatically allow cross-origin requests

// build multiple CRUD interfaces:
app.post("/createUser", async (request: functions.Request, response: functions.Response) => {
	let countUser = await getCountUser();
	countUser = countUser + 1;
	const constantsRef = db.collection("users");
	const docSnap = await constantsRef.doc(countUser.toString());
	await docSnap.set({ name: request.query.name });
	await incrementCountUsers();
	response.status(200).send({ id: countUser, name: request.query.name });
});

app.get("/getUsers", async (request: functions.Request, response: functions.Response) => {
	const usersRef = db.collection("users");
	const docSnap = await usersRef.get();
	const users = docSnap.docs.map(user => ({ id: user.id, name: user.get("name") }));
	response.json(users);
});

app.get("/getUser", async (request: functions.Request, response: functions.Response) => {
	const usersRef = db.collection("users");
	const docSnap = await usersRef.get();
	const userResp = docSnap.docs.map(user => ({ id: user.id, name: user.get("name") }));
	response.json(userResp.find(x => x.name === request.query.name));
});

app.delete("/deleteUser/:id", async (request: functions.Request, response: functions.Response) => {
	const usersRef = db.collection("users");
	const docSnap = await usersRef.doc(request.query.id.toString());
	await docSnap.delete().catch(() => response.status(500).json(fail));

	response.json(true);
});

app.post("/asteriuosInvoke", async (request: functions.Request, response: functions.Response) => {
	const constantsRef = db.collection("constants");
	const asteriuosInvoked = constantsRef.doc("asteriuosInvoked");
	const isAsteriousInvoked = await constantsRef.doc("asteriuosInvoked").get();
	const invocationTimeout = await constantsRef.doc("invocationTimeout").get();
	if (!isAsteriousInvoked.get("value")) {
		await asteriuosInvoked.set({ value: true });
		response.json("asterious ha sido invocado");
		setTimeout(async () => {
			await asteriuosInvoked.set({ value: false });
		}, invocationTimeout.get("value"));
	} else {
		response.status(404).json("asterious ya ha sido invocado por otra persona");
	}
});

app.post("/createMessage", async (request: functions.Request, response: functions.Response) => {
	const countMessages = await getCountMessage();
	console.log("countMessages", countMessages);
	const constantsRef = db.collection("messages");
	const docSnap = await constantsRef.doc((countMessages + 1).toString());
	await docSnap.set({
		message: request.query.message,
		userId: request.query.id,
	});
	await incrementCountMessage();
	response.status(200).send({ id: countMessages + 1, message: request.query.message });
});

app.get("/getMessages", async (request: functions.Request, response: functions.Response) => {
	const usersRef = db.collection("messages");
	const docSnap = await usersRef.get();
	const messages = docSnap.docs.map(message => {
		return { id: message.id, name: message.get("message"), userId: message.get("userId") };
	});
	response.json(messages);
});

app.delete("/deleteMessages", async (request: functions.Request, response: functions.Response) => {
	const constantsRef = db.collection("constants");
	const messagesRef = db.collection("messages");
	const countMessagesSnap = await constantsRef.doc("countMessages").get();
	let countMessages: number = countMessagesSnap.get("value") ? 0 : countMessagesSnap.get("value");
	while (countMessages !== 0) {
		await messagesRef.doc(countMessages.toString()).delete();
		countMessages -= 1;
	}
	console.log(countMessages);
	await constantsRef.doc("countMessages").set({ value: 0 });

	response.json(true);
});

const getCountUser = (): Promise<number> => {
	return new Promise(async (resolve, reject) => {
		const constantsRef = db.collection("constants");
		const docSnap = await constantsRef.doc("countUsers").get();

		if (!docSnap.exists) {
			await incrementCountUsers();
			resolve(0);
		} else {
			const countUser = await docSnap.get("value");
			resolve(countUser || 0);
		}
	});
};

const getCountMessage = (): Promise<number> => {
	return new Promise(async (resolve, reject) => {
		const constantsRef = db.collection("constants");
		const docSnap = await constantsRef.doc("countMessages").get();

		if (!docSnap.exists) {
			console.log("no exist");
			await incrementCountMessage();
			resolve(0);
		} else {
			const countMessages = await docSnap.get("value");
			console.log("getCountMessage", countMessages);
			resolve(countMessages || 0);
		}
	});
};

const incrementCountUsers = async () => {
	const constantsRef = db.collection("constants");
	const docSnap = constantsRef.doc("countUsers");
	const countUser = await docSnap.get();
	docSnap
		.set({ value: countUser.get("value") + 1 })
		.then(() => console.log("increment count user"))
		.catch(error => console.log("Error when increment count user", error));
};

const incrementCountMessage = async () => {
	const constantsRef = db.collection("constants");
	const docSnap = constantsRef.doc("countMessages");
	const countUser = await docSnap.get();
	docSnap
		.set({ value: countUser.get("value") + 1 })
		.then(() => console.log("increment count message"))
		.catch(error => console.log("Error when increment count message", error));
};

// Expose Express API as a single Cloud Function:
export const api = functions.https.onRequest(app);
