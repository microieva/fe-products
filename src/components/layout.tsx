import React, { FC } from 'react';
import Header from './header';
import Section from './section';
import Footer from './footer';

const Layout: FC = () => {
  return (
    <div className="layout-container">
        <Header/>
        <main>
          <Section/> 
        </main>
        <Footer />
    </div>
  )
}

export default Layout;