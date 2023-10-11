import { FC } from 'react';
import { User } from '../@types/user';
import { IconButton } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import { useNavigate } from 'react-router-dom';

interface Props {
    user: User
}

const ProfileView: FC<Props> = ({ user }) => {
    
    const goBack = useNavigate();


    return (
        <div className="view-container">
            <div className='view-header'>
                <h2>profile</h2>
                <div className='btn-group'>
                        <IconButton>
                            
                       </IconButton>
                       <IconButton onClick={()=> goBack('/')}>
                           <DoorBackOutlinedIcon/>
                       </IconButton>
                </div>
            </div>
            <div className='view-details'>
                <div className="profile-details-text">
                    <p><span>account name:</span> {user.name}</p>
                    <p><span>account email:</span> {user.email}</p>
                </div>
                <div className="img-wrapper">
                   <img src={`${user.avatar}`} alt="profile picture" />
                </div>
            </div>
        </div>
    )
}

export default ProfileView;