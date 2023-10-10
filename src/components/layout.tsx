import { FC } from 'react';
import Header from './header';
import Section from './section';
import UserProvider from '../contexts/user';

const Layout: FC = () => {
  return (
        <UserProvider>
            <Header/>
            <Section/> 
        </UserProvider>
    )
}

export default Layout;