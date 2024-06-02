function postData(endpoint, payload, jwt) {
    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(payload)
    });
}

function getData(endpoint, jwt) {
    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    });
}

function getDataWithoutBearer(endpoint) {
    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function postDataWithoutBearer(endpoint, payload) {
    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export { getData, postData, getDataWithoutBearer, postDataWithoutBearer }