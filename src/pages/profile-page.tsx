import { FC, useContext, useEffect, useState } from 'react';

import { UserContext } from '../contexts/user';
import Header from '../components/header';
import Footer from '../components/footer';

import { TypeUserContext } from '../@types/types';
import ProfileView from '../components/profile-view';
import { User } from '../@types/user';


const ProfilePage: FC = () => {
    const { user, onLogin } = useContext(UserContext) as TypeUserContext;
    const [ profile, setProfile ] = useState<User | undefined>(user);

    useEffect(()=> {
        onLogin();
        setProfile(user)
    }, [user]);

    return (
        <>
            <main>
                <Header/>
                {profile && <ProfileView user={profile}/>}
            </main>
            <Footer />
        </>
    ) 
}

export default ProfilePage;