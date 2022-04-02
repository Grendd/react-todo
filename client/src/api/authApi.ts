import config from "../config/default";
import {FormType} from "../types";

export const loginApi = async(data: FormType) => {
	const res = await fetch(`${config.apiAdress}/api/login`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	});

	return {
		data: await res.json(),
		status: res.status
	};
};

export const registerApi = async(data: FormType) => {
	const res = await fetch(`${config.apiAdress}/api/register`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	});

	return {
		data: await res.json(),
		status: res.status
	};
};