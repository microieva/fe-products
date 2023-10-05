import { FC, useEffect } from 'react'
import { User } from '../@types/user';
import { 
    useAddUserMutation, 
    useDeleteUserMutation, 
    useGetUsersQuery, 
    useUpdateUserMutation 
} from '../redux/api-queries/user-queries';
import Layout from '../components/layout';
import { useAddProductMutation } from '../redux/api-queries/product-queries';
import { Product } from '../@types/product';
import Footer from '../components/footer';

const Home: FC = () => {
    
    const {data, error, isLoading, isError} = useGetUsersQuery();
    
    useEffect(()=> {
        console.log('USERS from HOME: ', data);
        
    }, [])
    
    /*const testP: Partial<Product> = {
        title: "XXX New Product",
        price: 10,
        description: "A description",
        categoryId: 1,
        category: {
            id: 1,
            name: 'category name',
            image: ''
        },
        images: ["https://placeimg.com/640/480/any"]
    }*/

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