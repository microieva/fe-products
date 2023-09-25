import React, { FC } from 'react';

interface HeaderProps {
  page: string
}

const Header: FC<HeaderProps> = ({page}: HeaderProps) => {
  return (
    <header>
      <h1>This Is Header from {page}</h1>
    </header>
  )
}

export default Header;