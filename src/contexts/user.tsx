import { FC, ReactNode, createContext } from 'react';
import { TypeUserContext } from '../@types/types';
import { User } from '../@types/user';
import { LoginResponse } from '../@types/auth';
import { useGetUserQuery } from '../redux/api-queries/auth-queries';

export const UserContext = createContext<TypeUserContext | null>(null); 

interface UserProviderProps {
    children: ReactNode
}

const UserProvider: FC<UserProviderProps> = ({ children }: UserProviderProps) => {
    const storedToken: string | null= localStorage.getItem('token');
    const token: LoginResponse = JSON.parse(storedToken || '{}');
    const user: User | any = useGetUserQuery(token.access_token, { skip: !token.access_token });
    return <UserContext.Provider value={{ user }}>{ children }</UserContext.Provider>;
}

export default UserProvider;

