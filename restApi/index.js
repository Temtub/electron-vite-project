/**
 * Function to fetch datas
 * @param {*} method 
 * @param {*} endpoint 
 * @param {*} data 
 * @param {*} headers 
 * @returns 
 */
export const restful = async (method, endpoint, data, headers = {}) => {
    // OPtion of the petition
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            // ... spreads the data of an array or object
            ...headers
        },
        // Add data only when its not a GET fetch
        body: method !== 'GET' ? JSON.stringify(data) : undefined 
    };
    // Return the data
    return fetch(`http://13.53.216.208:3001${endpoint}`, options)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log('Error:', error);
            throw error; 
        });
};
