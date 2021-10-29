import config from "../config/default";

export const loginApi = async(data : object) => {
    const res = await fetch(`${config.apiAdress}/api/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return {
        data: await res.json(),
        status: res.status
    }

}
export const registerApi = async(data : object) => {
    const res = await fetch(`${config.apiAdress}/api/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    console.log(res)
    return {
        data: await res.json(),
        status: res.status
    }
}