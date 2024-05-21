import { useEffect, useState } from 'react'
import { getUserById } from '../getUserById';

export const useGetUserById = (id) => {
    const [user, setUser] = useState();
    
    const loadUser = async () => {
        const data = await getUserById(id)
        setUser(data)
    }

    useEffect( () => {
        console.log(id)
        loadUser(id)
    }, [id])

    return user;
}
