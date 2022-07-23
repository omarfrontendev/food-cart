import { useState } from 'react';
import Cart from './components/Cart/CartContainer/Cart';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/MealsSection/Meals';
import CartProvider from './store/CartProvider';
import './App.css';


function App() {


  const [openCart, setOpenCart] =useState(false);

  const closeCartHandler = () => {
    setOpenCart(false);
  };
  const openCartHandler = () => {
    setOpenCart(true);
  };

  return (
    <CartProvider>
      <Header onOpenCart={openCartHandler} />
      <main>
        <Meals/>
      </main>
      {openCart && <Cart onCloseCart={closeCartHandler}/>}
    </CartProvider>
  );
}


export default App;
