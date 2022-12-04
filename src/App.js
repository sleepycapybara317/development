import "./App.css";
import { useState } from "react";
import drinkData from "./assets/drink-data.json";
import DrinkItem from "./components/DrinkItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
drinkData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
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
  }

  return (
    <div className="App">
      <h1>Queen Bean Café</h1> {/* TODO: personalize your bakery (if you want) */}

      {drinkData.map((item) => ( // TODO: map drinkData to DrinkItem components
        <p>
          <DrinkItem name = {item.name} image = {item.image} desc = {item.description} price = {item.price} addToCart = {addItemToCart}/>
        </p> // replace with DrinkItem component
      ))}

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