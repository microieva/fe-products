import { FC, ReactNode, createContext } from 'react';
import { TypeForm, TypeFormContext } from '../@types/types';

export const FormContext = createContext<TypeFormContext | null>(null); 

interface FormProviderProps {
  children: ReactNode,
  form: TypeForm
}

const FormProvider: FC<FormProviderProps> = ({children, form}: FormProviderProps) => {
    const onClose =() => {
      return true;
    }
    return <FormContext.Provider value={{form, onClose}}>{ children }</FormContext.Provider>;
}

export default FormProvider;