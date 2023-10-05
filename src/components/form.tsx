import { FC, useContext } from 'react';

import { FormContext } from '../contexts/form';
import { TypeFormContext } from '../@types/types';

import SignupForm from './signup-form';
import LoginForm from './login-form';
                                
const Form = () => {
    const { form } = useContext(FormContext) as TypeFormContext;
    
    switch (form) {
        case 'signup':
            return <SignupForm />
        case 'login':
            return <LoginForm />
        default: 
            return <></>
    }
      
}
export default Form;