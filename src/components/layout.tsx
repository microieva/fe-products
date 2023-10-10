import { FC } from 'react';
import Header from './header';
import Section from './section';

const Layout: FC = () => {
    // combine this Layout + Product + Profile // all returning Header + some view component
  return (
        <>
            <Header/>
            <Section/> 
        </>
    )
    /*
    return (
        <>
            <main>
                <Header />
                { product && <View product={product} }
                { user && <View user={user} }
            </main>
            <Footer />
        </>
    ) */
}

export default Layout;