import { FC } from 'react';
import Header from './header';
import Section from './section';
import Footer from './footer';

const Layout: FC = () => {
  return (
    <>
        <Header/>
        <Section/> 
        <Footer />
    </>
  )
}

export default Layout;