import { FC, useEffect, useState } from 'react';

import Home from './pages/home';
import UserProvider from './contexts/user';
import { User } from './@types/user';
import { LoginResponse } from './@types/auth';

const App: FC = () => {
    const [ user, setUser ] = useState<Partial<User> | LoginResponse>()

    useEffect(()=> {
        const storedUserJSON = localStorage.getItem('user');
        if (storedUserJSON) {
            const storedUser = JSON.parse(storedUserJSON);
            console.log("from user context: ", storedUser.name); // Access the user's name
            console.log('from user context: ',storedUser.role); // Access the user's role
            setUser(storedUser);
        } else {
            setUser(undefined);
        }
    }, []);

    return (
        <UserProvider user={user}>
            <div className='app-container'>
                <Home />
            </div>
        </UserProvider>
    )
}

export default App;