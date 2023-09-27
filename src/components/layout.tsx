import React, { FC } from 'react';
import Header from './header';
import Section from './section';
import Footer from './footer';

const Layout: FC = () => {
  return (
    <div>
        <Header/>
        <Section/> 
        <Footer />
    </div>
  )
}

export default Layout;