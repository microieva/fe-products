import { FC, useState } from 'react';
import { User } from '../@types/user';
import { IconButton, ThemeProvider, Backdrop, Dialog } from '@mui/material';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import { useNavigate } from 'react-router-dom';
import FormProvider from '../contexts/form';
import { theme } from '../shared/theme';
import ProductForm from './product-form';

interface Props {
    user: User
}

const ProfileView: FC<Props> = ({ user }) => {
    const [ open, setOpen ] = useState<boolean>(false);
    const goBack = useNavigate();

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <div className="view-container">
                <div className='view-header'>
                    <h2>profile</h2>
                    <div className='btn-group'>
                            <IconButton>
                                <PlaylistAddOutlinedIcon onClick={()=> setOpen(true)}/>  
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
        <ThemeProvider theme={theme}>
            <FormProvider onClose={handleClose}>
                <Dialog fullWidth open={open} onClose={handleClose} >
                    <ProductForm />
                </Dialog>
            </FormProvider>
            <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
        </ThemeProvider>
    </>
    )
}

export default ProfileView;