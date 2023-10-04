import { FC, useContext } from 'react';

import { FormContext } from '../contexts/form';
import { TypeFormContext } from '../@types/types';

import SignupForm from './signup-form';
                                
const Form = () => {
    const { form } = useContext(FormContext) as TypeFormContext;
    
    switch (form) {
        case 'signup':
            return <SignupForm />
        case 'login':
            return <p>LOGIN FORM</p>
        default: 
            return <></>
    }
      
}
export default Form;