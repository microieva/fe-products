import { FC, useEffect } from 'react'
import { 
    useGetUsersQuery
} from '../redux/api-queries/user-queries';
import Layout from '../components/layout';
import Footer from '../components/footer';

const Home: FC = () => {
    
    const {data, error, isLoading, isError} = useGetUsersQuery();
    
    useEffect(()=> {
        console.log('USERS from HOME: ', data, error);
        
    }, [data])

    return (
        <>
            <main>
                <Layout/>
            </main>
            <Footer />
        </>
        ) 
}

export default Home;