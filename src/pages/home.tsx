import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../shared/store';
import { User } from '../@types/user';
import { addUser } from '../redux/app-reducers/users';

const Home: FC = () => {
    const users = useSelector((state: AppState) => state.users);
    console.log('users: ', users);
    const dispatch: AppDispatch = useDispatch();

    const test: User = {
        id: 0,
        email: "",
        password: "",
        name: "",
        role: "",
        avatar: "avatar",
    }

  const onAddUser = () => {
    dispatch(addUser(test));
  }

  return (
    <>
      <div>Home</div>
      <button onClick={onAddUser}>Add New User</button>
    </>
  )
}

export default Home;