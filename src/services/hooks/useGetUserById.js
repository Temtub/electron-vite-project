import { useEffect, useState } from 'react'
import { getUserById } from '../getUserById';

export const useGetUserById = (id) => {
    const [user, setUser] = useState();

    const loadUser = async () => {
        const data = await getUserById(id)
        setUser(data)
    }

    useEffect( () => {
        loadUser(id)
    }, [id])

    return user;
}
