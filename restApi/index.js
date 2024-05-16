/**
 * Function to fetch datas
 * @param {*} method 
 * @param {*} endpoint 
 * @param {*} data 
 * @param {*} headers 
 * @returns 
 */
export const restful = (method, endpoint, data, headers = {}) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            // ... spreads the data
            ...headers
        },
        // Add data only when its not a GET fetch
        body: method !== 'GET' ? JSON.stringify(data) : undefined 
    };

    return fetch(endpoint, options)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            // console.log('Error:', error);
            throw error; // Re-lanzar el error para que el llamador pueda manejarlo
        });
};
