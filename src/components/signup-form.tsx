import { FormEvent, useContext, useEffect, useRef, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import { IconButton, TextField } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

import { useAddUserMutation } from '../redux/api-queries/user-queries';
import { FormContext } from '../contexts/form';
import { TypeFormContext } from '../@types/types';
import { User } from '../@types/user';


const SignupForm = () => {
    // 'https://api.lorem.space/image/face?w=640&h=480&r=867' avatar
    const [user, setUser] = useState<Partial<User>>()
     
    const [ name, setName ] = useState<string>();
    const [ password, setPassword ] = useState<string>();
    const [ email, setEmail ] = useState<string>();
    const [ avatar, setAvatar ] = useState<string>();

    const { onClose } = useContext(FormContext) as TypeFormContext;
    const [addUser, { error }] = useAddUserMutation();
    const [ err, setErr ] = useState<boolean>(false);
    //const [ login, { error, data }] = useLoginMutation();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = {
            name,
            email,
            password,
            avatar
        }
        setUser(user)
        // const addUserResponse = await addUser(user);
        console.log('error: ', error);
        
        if (!error) {

            onClose();
        } else {
            setErr(true);
            formRef.current && formRef.current.reset();
        }
    };

    const handleInputFocus = () => {
        setErr(false);
    };

    useEffect(()=> {
        const initialSignUp = async () => {
            //const addUserResponse = 
            user && await addUser(user);
            console.log('error------: ', error)
        }
        initialSignUp();
    }, [user]);

    return (
        <div className='form-container'>
            <h2>create account</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        variant="standard"
                        label="Name"
                        name="name"
                        value={name}
                        onChange={() => setName(name)}
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
                        id="standard-basic"
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
                        id="standard-basic"
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
                        id="standard-basic"
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
