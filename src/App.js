import "./App.css";
// import { useState } from "react";
import drinkData from "./assets/drink-data.json";
import DrinkItem from "./components/DrinkItem";
import React, { useState } from 'react';

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
drinkData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cart, setCart] = useState([]);

  const addPrice = (price) => {
    setTotalPrice((p) => price + p);
  };

  const addQuantity = () => {
    setTotalQuantity((q) => q + 1);
  };

  const addItemToCart = (name, price) => {
    let exists = false;
    let add = cart.map((c) => {
      if (c.name === name) {
        exists = true;
        return {name: c.name, quantity: (c.quantity + 1)};
      }
      else {
        return c;
      }
    });
    if(exists === false) {
      setCart((c) => [...c, {name: name, quantity: 1}])
    }
    else {
      setCart(add);
    }

    addPrice(price);
    addQuantity();
  };

  // make list of drink components
  const allDrinks = drinkData.map((item) => {
    return <DrinkItem key = {item.id} name = {item.name} image = {item.image} desc = {item.description} cal = {item.calories} temp = {item.temp} price = {item.price} addToCart = {addItemToCart}/>;
  });

  const [drinks, setDrinks] = useState(allDrinks);
  const sortPrices = () => {
    const sorted = [...drinks].sort((a,b) => {
      if (a.price > b.price) return 1;
      if (a.price < b.price) return -1;
      return 0;
    });
    setDrinks(sorted)
  }
  return (
    <div className="App">
      <h1>Queen Bean Café</h1> {}

      {/* {drinkData.map((item) => ( // TODO: map drinkData to DrinkItem components
        <p>
          <DrinkItem name = {item.name} image = {item.image} desc = {item.description} price = {item.price} addToCart = {addItemToCart}/>
        </p> 
      ))} */}

    {/* print allDrinks */}
    {drinks.map((item) => ( // TODO: map drinkData to DrinkItem components
        <div>
          {item};
        </div> 
    ))}
      <div className="filter-container">
        <button onClick={sortPrices}>
        SORT By Price (low - high)
        </button>
        <h3>Beverage Type</h3>
        <h4>Coffee</h4>
        <h4>Tea</h4>
        <h4>Other</h4>
        <h4>All</h4>
        <h3>Temperature</h3>
        <h4>Hot</h4>
        <h4>Cold</h4>
      </div>

      <div className="cart-container">
          <h2>My Cart ({totalQuantity})</h2>
          {cart.map((item) => (
          <p>
            {item.quantity}x {item.name}
          </p> ))}
          <h3>Subtotal: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default App;