import { FC, useEffect } from 'react'
import { useGetUsersQuery } from '../redux/api-queries/user-queries';
import Footer from '../components/footer';
import Header from '../components/header';
import Section from '../components/section';

const HomePage: FC = () => {
    const {data, error, isLoading, isError} = useGetUsersQuery();
    
    useEffect(()=> {
        console.log('USERS from HOME: ', data, error);
        
    }, [data])

    return (
        <>
            <main>
                <Header />
                <Section />
            </main>
            <Footer />
        </>
    ) 
}

export default HomePage;