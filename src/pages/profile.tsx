import { FC, useContext, useEffect, useState } from 'react'

import Layout from '../components/layout';
import Footer from '../components/footer';
import { TypeUserContext } from '../@types/types';
import { error } from 'console';
import { UserContext } from '../contexts/user';
import { User } from '../@types/user';
import ProfileDetails from '../components/profile-details';

const Profile: FC = () => {
    
    const { user, onLogin } = useContext(UserContext) as TypeUserContext;
    const [ profile, setProfile ] = useState<User | undefined>(user);
    
    useEffect(()=> {
      onLogin();
      //user && setProfile(user);
    }, [user]);
    console.log('user, profile from PROFILE: ', user, profile);

    return (
        <>
            <main style={{height: "90vh"}}>
                {user && <ProfileDetails user={user}/>}
            </main>
            <Footer />
        </>
    ) 
}

export default Profile;