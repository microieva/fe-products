import { FC } from 'react';

import Home from './pages/home';
import Products from './pages/products';

const App: FC = () => {
  return (
    <div>
      <Home />
      <Products />
    </div>
  )
}

export default App;