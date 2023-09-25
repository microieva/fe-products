import React, { FC } from 'react';
import Header from './header';
import Section from './section';
import Footer from './footer';

interface LayoutProps {
    page: string
}

const Layout: FC<LayoutProps> = ({page}: LayoutProps) => {
  return (
    <div>
        <Header page={page}/>
        <Section page={page}/> 
        <Footer />
    </div>
  )
}

export default Layout;