export const HttpStatusCodes = Object.freeze({
    OK: 200,
    InternalServerError: 500,
    NotFound: 404,
    Conflict: 409,
    Unauthorized: 401,
    BadRequest: 400,
    Forbidden: 403,
    Created: 204,
    NotAcceptable: 406
});


export function postData(endpoint, payload, jwt) {
    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(payload)
    });
}

export function getData(endpoint, jwt) {
    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    });
}

export function putData(endpoint, payload, jwt) {
    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(payload)
    });
}

export function getDataWithoutBearer(endpoint) {
    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function postDataWithoutBearer(endpoint, payload) {
    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}