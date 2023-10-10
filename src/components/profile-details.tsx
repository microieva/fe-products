import { FC } from 'react';
import { User } from '../@types/user';
import { IconButton } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  user: User
}
/*
interface ViewProps {
    user?: User,
    product?: Product
}
*/

const ProfileDetails: FC<ProfileProps> = ({ user }) => {
    // this should be View and reusable for product details, showing more fields and with edit IconButton -> on true shows form (not in Dialog); with all updatable fields, and save & door icons; IF all fields changed, than on save we ask save updates or add as new product -> then onClick -> addProduct / updateProduct
    const goBack = useNavigate();

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>profile</h2>
                <div className='btn-group'>
                        <IconButton>
                            
                        </IconButton>
                        <IconButton onClick={()=> goBack('/')}>
                            <DoorBackOutlinedIcon/>
                        </IconButton>
                </div>
            </div>
            <div className="profile-details">
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

export default ProfileDetails