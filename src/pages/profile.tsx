import { FC, useContext, useEffect } from 'react'

import { UserContext } from '../contexts/user';
import Header from '../components/header';
import ProfileDetails from '../components/profile-details';
import Footer from '../components/footer';

import { TypeUserContext } from '../@types/types';


const Profile: FC = () => {
    
    const { user, onLogin } = useContext(UserContext) as TypeUserContext;
    
    useEffect(()=> {
        onLogin();
    }, [user]);

    return (
        <>
            {user ? 
                <main>
                    <Header title={`Hello, ${user.name}`}/>
                    {<ProfileDetails user={user}/>}
                </main>
            :
                <main>
                    <h1>NO PAGE</h1>
                </main> }
            <Footer />
        </>
    ) 
}

export default Profile;