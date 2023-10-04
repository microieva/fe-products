import * as React from 'react';
import SignupForm from './signup-form';


interface FormProps {
    onClose?: ()=> void,
    form: 'signup' | 'login' | null
}
                                
const Form: React.FC<FormProps> = ({form}: FormProps) => {
    

    switch (form) {
        case 'signup':
            return <SignupForm />
        case 'login':
            return <p>ANOTHER FORM</p>
        default: 
            return;
    }
      
}
export default Form;