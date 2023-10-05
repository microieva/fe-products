import { ChangeEvent, FormEvent, useContext, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import { IconButton, TextField } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

import { useAddUserMutation } from '../redux/api-queries/user-queries';
import { FormContext } from '../contexts/form';
import { TypeFormContext } from '../@types/types';
import { User } from '../@types/user';


const SignupForm = () => {
    const avatar = 'https://api.lorem.space/image/face?w=640&h=480&r=867';
    const [user, setUser] = useState<Partial<User>>({
        email: '',
        password: '',
        name: '',
        avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867'
    });
    const { onClose } = useContext(FormContext) as TypeFormContext;
    const [addUser] = useAddUserMutation();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newUser = addUser(user);
        const jsonUser = JSON.stringify(newUser)
        console.log('newUser: ', jsonUser);
        //localStorage.setItem('user', jsonUser);
        onClose();
    };

    return (
        <div className='form-container'>
            <h2>create account</h2>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        variant="standard"
                        label="Name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        variant="standard"
                        label="Email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        variant="standard"
                        label="Password"
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        variant="standard"
                        label="Avatar"
                        name="avatar"
                        value={user.avatar}
                        onChange={handleChange}
                    />
                </FormControl> 
                <div className='btn-group'>
                    <IconButton type ="submit">
                        <BackupOutlinedIcon/>
                    </IconButton>
                    <IconButton onClick={()=> onClose()}>
                        <DoorBackOutlinedIcon/>
                    </IconButton>
                </div>
            </form>
        </div>
    
    );
}

export default SignupForm;

/*
create user context 

import React from 'react';

import { useGetUserQuery } from '../redux/services/authApi';
import { LoginRes } from '../types/auth';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const localToken = localStorage.getItem('token');
  const token: LoginRes = JSON.parse(localToken || '{}');

  useGetUserQuery(token.access_token, { skip: !token.access_token });

  return <>{children}</>;
};

export default UserProvider;
*/