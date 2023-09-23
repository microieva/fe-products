import { FC } from 'react'
import { User } from '../@types/user';
import { 
    useAddUserMutation, 
    useDeleteUserMutation, 
    useFetchAllUsersQuery, 
    useUpdateUserMutation 
} from '../redux/api-queries/user-queries';

const Home: FC = () => {
    const {data, error, isLoading, isError} = useFetchAllUsersQuery();

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

    return (
        <>
            <div>Home</div>
            <button onClick={()=>onAddUser()}>Add New User</button>
            <button onClick={()=>onDeleteUser()}>DELETE USER</button>
            <button onClick={()=>onUpdateUser()}>UPDATE USER</button>
        </>
    )
}

export default Home;