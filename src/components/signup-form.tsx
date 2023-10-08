import { FormEvent, useContext, useEffect, useRef, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import { IconButton, TextField } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

import { useAddUserMutation } from '../redux/api-queries/user-queries';
import { FormContext } from '../contexts/form';
import { TypeFormContext } from '../@types/types';
import { User } from '../@types/user';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';


const SignupForm = () => {
    // 'https://api.lorem.space/image/face?w=640&h=480&r=867' avatar
    const [user, setUser] = useState<Partial<User>>();
     
    const [ name, setName ] = useState<string>();
    const [ signupUser, setSignedupUser ] = useState<User>();
    const [ password, setPassword ] = useState<string>();
    const [ email, setEmail ] = useState<string>();
    const [ avatar, setAvatar ] = useState<string>();

    const { onClose } = useContext(FormContext) as TypeFormContext;
    const [ addUser ] = useAddUserMutation();
    const [ errors, setErrors ] = useState<string[] | null>(null);
    const [ err, setErr ] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = {
            name,
            email,
            password,
            avatar
        }
        setUser(user);
        try {
            const payload = user && await addUser(user).unwrap();
            setSignedupUser(payload);
            setErr(false);
          } catch (error: any) {
            setErr(true);
            setErrors(error.data.message)
          }
        if (signupUser) {
            // if no error, login with data.email & data.password
            onClose();
        } else {
            formRef.current && formRef.current.reset();
        }
    };

    const handleInputFocus = () => {
        setErr(false);
    };

    return (
        <div className='form-container'>
            <h2>create account</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Name"
                        name="name"
                        value={name}
                        onChange={() => setName(name)}
                        required
                        helperText={errors && errors[1] || 'Some error'}
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: err ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            }
                        }}
                        onFocus={()=>handleInputFocus()} // make seperate error status, so that on focus, just one disappears
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={() => setEmail(email)}
                        required
                        helperText="Some error"
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: err ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            }
                        }}
                        onFocus={()=>handleInputFocus()}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={()=> setPassword(password)}
                        required
                        helperText="Some error"
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: err ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            }
                        }}
                        onFocus={()=>handleInputFocus()}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Avatar"
                        name="avatar"
                        value={avatar}
                        onChange={() => setAvatar(avatar)}
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: err ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            }
                        }}
                        helperText="Some error"
                        onFocus={()=>handleInputFocus()}
                    />
                </FormControl> 
                <div className='btn-group'>
                    <IconButton type ="submit" onClick={()=> handleSubmit}>
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
