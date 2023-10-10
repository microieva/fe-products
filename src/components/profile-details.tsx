import React, { FC } from 'react';
import { User } from '../@types/user';

interface ProfileProps {
  user: User
}

const ProfileDetails: FC<ProfileProps> = ({user}) => {
  return (
    <div>
      <h1>HELLO {user.name} !</h1>
    </div>
  )
}

export default ProfileDetails