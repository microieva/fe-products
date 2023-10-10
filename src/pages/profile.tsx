import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../contexts/user';
import Header from '../components/header';
import ProfileDetails from '../components/profile-details';
import Footer from '../components/footer';

import { TypeUserContext } from '../@types/types';


const Profile: FC = () => {
    const { user, onLogin } = useContext(UserContext) as TypeUserContext;
    const goBack = useNavigate();

    useEffect(()=> {
        onLogin();
    }, [user]);

    return (
        <>
            {user ? 
                <main>
                    <Header/>
                    {<ProfileDetails user={user}/>}
                </main>
            :
                goBack('/')
            }
            <Footer />
        </>
    ) 
}

export default Profile;