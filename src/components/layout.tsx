import React, { FC } from 'react';
import Header from './header';
import Section from './section';
import Footer from './footer';

interface LayoutProps {
    isProducts: boolean
}

const Layout: FC<LayoutProps> = ({isProducts}: LayoutProps) => {
  return (
    <div>
        {/* <Header page={page}/> */}
        <Section isProducts={isProducts}/> 
        <Footer />
    </div>
  )
}

export default Layout;