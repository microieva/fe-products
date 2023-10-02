import { FC } from 'react';
import Button from './button';

const Header: FC = () => {

  const handleClick = () => {
    console.log('sign in click')
  }
  
  return (
    <header>
      <h2>PRODUCTS</h2>
      <Button text="sign in" width="8rem" height="2rem" onClick={handleClick} />
    </header>
  )
}

export default Header;