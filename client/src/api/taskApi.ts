import config from "../config/default";

import {FullStateTask} from "../types";

export const taskApiGetAll = (userId: string | null): Promise<FullStateTask[]> => fetch(`${config.apiAdress}/api/tasks`, {
	method: "POST",
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-type": "application/json; charset=UTF-8",
	},
	body: JSON.stringify({
		user: {
			userId: userId
		}
	}),
}).then(response => response.json());

export const taskApiPost = (data: FullStateTask) => fetch(`${config.apiAdress}/api/tasks/create`, {
	method: "POST",
	body: JSON.stringify(data),
	headers: {
		"Content-type": "application/json; charset=UTF-8",
	},
}).then((response) => response.json());

export const taskApiUpdate = (data: FullStateTask) => fetch(`${config.apiAdress}/api/tasks`, {
	method: "PUT",
	body: JSON.stringify(data),
	headers: {
		"Content-type": "application/json; charset=UTF-8",
	},
}).then((response) => response.json());

export const taskApiDelete = (data: FullStateTask) => fetch(`${config.apiAdress}/api/tasks`, {
	method: "DELETE",
	body: JSON.stringify(data),
	headers: {
		"Content-type": "application/json; charset=UTF-8",
	},
}).then((response) => response.json());