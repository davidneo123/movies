import config from 'config';

export const movieService = {
    getAll,
    getCast,
};

const requestOptions = {
    method: 'GET',
};

function getAll(q) {
    console.log(q)
    if(q){return fetch(`${config.apiUrl}/search/movies?q=${q}`, requestOptions).then(handleResponse)}
    else{
    return fetch(`${config.apiUrl}/movies`, requestOptions).then(handleResponse)}
}

function getCast(id) {
    return fetch(`${config.apiUrl}/movies/${id}/cast`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}