import { FormEvent, RefObject, useContext, useEffect, useRef, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import { IconButton, TextField } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';

import { FormContext } from '../contexts/form';
import { TypeFormContext } from '../@types/types';
import { useLoginMutation } from '../redux/api-queries/auth-queries';


const LoginForm = () => {
    const [ email, setEmail ] = useState<string>();
    const [ password, setPassword ] = useState<string>();
    const [ err, setErr ] = useState<string>();
    const { onClose } = useContext(FormContext) as TypeFormContext;
    const [ login, { error, data }] = useLoginMutation();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        if (!error && data) {  
            localStorage.setItem('token', JSON.stringify(data.access_token));
            onClose();
        } else {
            console.log('ERROR: ', error)
            setErr("Incorrect email or password")
            setEmail("");
            setPassword("");
            formRef.current && formRef.current.reset();
        }
    };

    useEffect(()=> {
        const initialLogin = async () => {
            email && password && await login({email, password});
        }
        initialLogin();
    }, [email, password])

    return (
        <div className='form-container'>
            <h2>log in</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        error
                        helperText={err}
                        id="standard-basic"
                        variant="standard"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={()=> setEmail(email)}
                        required
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        error
                        helperText={err}
                        fullWidth
                        id="standard-basic"
                        variant="standard"
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={()=> setPassword(password)}
                        required
                    />
                    {/* {error && <FormHelperText>error</FormHelperText>} */}
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