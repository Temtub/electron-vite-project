// Function to make the call to the bd to get the info of a user by the id
export const getUserById = async (userId) => {
    
    return fetch(`/api/user/${userId}`)
        .then(response => response.json())
        .then(response => {
            return (response)
        })
        .catch(err => console.error(err));
}