import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import { TypeUserContext } from '../@types/types';
import { User } from '../@types/user';
import { LoginResponse } from '../@types/auth';
import { useGetUserQuery } from '../redux/api-queries/auth-queries';

export const UserContext = createContext<TypeUserContext | null>(null); 

interface UserProviderProps {
    children: ReactNode
}

const UserProvider: FC<UserProviderProps> = ({ children }: UserProviderProps) => {
    const [ user, setUser ] = useState<User | null>(null);
    const storedToken: string | null = localStorage.getItem('token');
    const token: LoginResponse = JSON.parse(storedToken || '{}');
    const res = useGetUserQuery(token.access_token);
    console.log('res from PROVIDER: ', res);

    useEffect(()=> {
        res.isSuccess && setUser(res.data)
    }, [user])

    return <UserContext.Provider value={{ user }}>{ children }</UserContext.Provider>;
}

export default UserProvider;

