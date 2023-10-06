import { FC } from 'react';

import Home from './pages/home';
import UserProvider from './contexts/user';

const App: FC = () => {

    return (
        <UserProvider>
            <div className='app-container'>
                <Home />
            </div>
        </UserProvider>
    )
}

export default App;