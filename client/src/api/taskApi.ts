import config from "../config/default";

export const taskApiGetAll = () => {
   return fetch(`${config.apiAdress}/api/tasks`, {
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => response.json())
}

export const taskApiPost = (data : object) => {
    fetch(`${config.apiAdress}/api/tasks`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => response.json())
}

export const taskApiUpdate = (data : object) => {
    fetch(`${config.apiAdress}/api/tasks`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => response.json())
}

export const taskApiDelete = (data : object) => {
    fetch(`${config.apiAdress}/api/tasks`, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => response.json())
}