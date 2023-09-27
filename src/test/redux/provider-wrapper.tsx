import { Provider } from "react-redux";
import { store } from '../../shared/store';
import { ReactNode } from "react";

export interface WrapperProps {
  children: ReactNode
}


export const wrapper = ({children}: WrapperProps) => (
  <Provider store={store}>{children}</Provider>
)