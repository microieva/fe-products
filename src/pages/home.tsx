import { FC } from 'react'
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

const Home: FC = () => {
    const {data, error, isLoading, isError} = useGetUsersQuery();

    console.log('USERS from HOME: ', data);

    const test: Partial<User> = {
        name: "TEST--1",
        email: "test@mail.com",
        password: "test", // password >= 4 characters && only letters and numbers
        avatar: "https://api.lorem.space/image/face?w=150&h=220"
    }
    const [addUser] = useAddUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();

    const onAddUser = () => {
        addUser(test); // tested works
    }
    const onDeleteUser = () => {
        data && deleteUser(data.length-1); // tested works
    }
    const onUpdateUser =() => { // tested works
        data && updateUser({ id: 12, name: 'updated-name', password: 'updatedPassowrd'}); 
        // some users will be blocked from updating: can update only own added users
    }
    const testP: Partial<Product> = {
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
}
    const [addProduct] = useAddProductMutation();
    const onAddNewProduct = () => {
        addProduct(testP); //tested works with Test type
    }

    return (
        <>
            {/* <div>Home</div>
            <button onClick={()=>onAddUser()}>Add New User</button>
            <button onClick={()=>onDeleteUser()}>DELETE USER</button>
            <button onClick={()=>onUpdateUser()}>UPDATE USER</button> */}
            {/* <button onClick={()=>onAddNewProduct()}>Add New Product</button> */}
            <Layout/>
        </>
    )
}

export default Home;