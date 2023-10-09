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
    const [user, setUser] = useState<User | undefined>();
    const storedToken: string | null = localStorage.getItem('token');
    const token: string = storedToken && JSON.parse(storedToken);
    const { data } = useGetUserQuery(token);
    
    const onLogout = () => {
        localStorage.removeItem('token');
        setUser(undefined);
    };
    useEffect(() => {
        setUser(data);
    }, [data]);

    return <UserContext.Provider value={{ user, onLogout }}>{ children }</UserContext.Provider>;
}

export default UserProvider;

