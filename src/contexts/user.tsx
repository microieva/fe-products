import { FC, ReactNode, createContext, useState } from 'react';
import { TypeUserContext } from '../@types/types';
import { User } from '../@types/user';
import { LoginResponse } from '../@types/auth';

export const UserContext = createContext<TypeUserContext | null>(null); 

interface UserProviderProps {
    children: ReactNode,
    user: Partial<User> | LoginResponse | undefined
}

const UserProvider: FC<UserProviderProps> = ({ children, user }: UserProviderProps) => {
    return <UserContext.Provider value={{user}}>{ children }</UserContext.Provider>;
}

export default UserProvider;