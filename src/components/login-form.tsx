import { FormEvent, useContext, useEffect, useRef, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import { IconButton, TextField } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';

import { FormContext } from '../contexts/form';
import { TypeFormContext } from '../@types/types';
import { useLoginMutation } from '../redux/api-queries/auth-queries';
import { LoginRequest } from '../@types/auth';


const LoginForm = () => {
    const [ request, setRequest ] = useState<LoginRequest | undefined>();

    const [ email, setEmail ] = useState<string>();
    const [ password, setPassword ] = useState<string>();

    const [ err, setErr ] = useState<boolean>(false);
    const { onClose } = useContext(FormContext) as TypeFormContext;
    const [ login, { error, data }] = useLoginMutation();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setRequest({email, password});
        if (!err) {
            onClose();
        }
    };

    const handleInputFocus = () => {
        setErr(false);
    };

    const saveToken = (token: string) => {
        localStorage.setItem('token', JSON.stringify(token));
    }

    useEffect(()=> {
        const initialLogin = async () => {
            try {
                const payload = request && await login({email: request.email, password: request.password}).unwrap();
                payload && saveToken(payload.access_token);
            } catch (e){
                setErr(true);
            }
        }
        initialLogin();
       
    }, [request]);

    return (
        <div className='form-container'>
            <h2>log in</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        helperText="Incorrect email or password"
                        id="standard-basic"
                        variant="standard"
                        label="Email"
                        name="email"
                        onChange={(e)=> setEmail(e.target.value)}
                        required
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
                        helperText="Incorrect email or password"
                        fullWidth
                        id="standard-basic"
                        variant="standard"
                        label="Password"
                        name="password"
                        type="password"
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        sx={{
                            '& .MuiFormHelperText-root': {
                                visibility: err ? 'visible' : 'hidden',
                                transition: 'visibility 0.2s ease-in',
                            }
                        }}
                        onFocus={()=>handleInputFocus()}
                    />
                </FormControl>
                <div className="btn-group">
                    <IconButton  type="submit" onClick={() => handleSubmit}>
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