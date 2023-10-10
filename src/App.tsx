import { FC } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/home';
import Profile from './pages/profile';
import UserProvider from './contexts/user';

const App: FC = () => {

    return (
        <UserProvider>
            <div className='app-container'>
                <BrowserRouter>
                    <Routes>
                            <Route path="/" element={<Home />}/>
                            <Route path="/auth/profile" element={<Profile />}/>
                            {/* <Route path="/brewery/:productId" element={<ProductPage />} /> */}
                    </Routes>
                </BrowserRouter>
            </div>
        </UserProvider>
    )
}

export default App;