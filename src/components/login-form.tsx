import { ChangeEvent, FormEvent, useContext, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import { IconButton, TextField } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';

import { FormContext } from '../contexts/form';
import { TypeFormContext } from '../@types/types';
import { useLoginMutation } from '../redux/api-queries/auth-queries';
import { LoginRequest, LoginResponse } from '../@types/auth';


const LoginForm = () => {
    const [ req, setReq ] = useState<LoginRequest>({
        email: '',
        password: ''
    });
    const { onClose } = useContext(FormContext) as TypeFormContext;
    const [ login ] = useLoginMutation();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setReq((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();   
        const token = await login(req);
        //type check ? error check
        localStorage.setItem('token', JSON.stringify(token));
        onClose();
    };

    return (
        <div className='form-container'>
            <h2>log in</h2>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        variant="standard"
                        label="Email"
                        name="email"
                        value={req.email}
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
                        value={req.password}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <div className="btn-group">
                    <IconButton  type="submit">
                        <LoginOutlinedIcon/>
                    </IconButton>
                    <IconButton onClick={()=> onClose()}>
                        <DoorBackOutlinedIcon/>
                    </IconButton>
                </div>
              </form>
            </div>
    )
}

export default LoginForm;