import { FC, useContext } from 'react';

import { FormContext } from '../contexts/form';
import { TypeFormContext } from '../@types/types';

//import { Form } from './_form';

import SignupForm from './signup-form';
import LoginForm from './login-form';
                                
const FormSwitcher = () => {
    const { form } = useContext(FormContext) as TypeFormContext;
    
    /*switch (form) {
        case 'signup':
            return <Form schema={{
                name: "",
                email: "",
                password: "",
                avatar: ""
            }}/>
        case 'login':
            return <Form schema={{
                email: "",
                password: ""
            }}/>
        default: 
            return <></>
    }*/
    switch (form) {
        case 'signup':
            return <SignupForm />
        case 'login':
            return <LoginForm />
        default: 
            return <></>
    }
      
}
export default FormSwitcher;