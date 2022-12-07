import "./App.css";
// import { useState } from "react";
import drinkData from "./assets/drink-data.json";
import DrinkItem from "./components/DrinkItem";
import Checkbox from "./components/Checkbox";
import React, { useState } from 'react';

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
// drinkData.forEach((item) => {
//   item.image = process.env.PUBLIC_URL + "/" + item.image;
// });
/* ############################################################## */

function App() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cart, setCart] = useState({});
  // const [isSorted, setIsSorted] = useState(false);
  const [lst, setLst] = useState([...drinkData]);

  const addPrice = (price) => {
    setTotalPrice((p) => price + p);
  };

  const addQuantity = () => {
    setTotalQuantity((q) => q + 1);
  };

  const addItemToCart = (name, price) => {
    const updatedCart = {...cart};
    if (typeof updatedCart[name] == 'undefined') {
      updatedCart[name] = {name: name, quantity: 1};
    } else {
      updatedCart[name] = {name: name, quantity: updatedCart[name].quantity+1};
    }
    setCart(updatedCart)

    addPrice(price);
    addQuantity();
  };

  // make list of drink components -- is this the right place?
  // const allDrinks = drinkData.map((item) => {
  //   return <DrinkItem key = {item.id} name = {item.name} image = {item.image} desc = {item.description} cals = {item.calories} temp = {item.temp} price = {item.price} addToCart = {addItemToCart}/>;
  // });

  let sorted = drinkData;
  
  // const sortPrices = () => {
  //   let sorted = [...lst].sort((a,b) => {
  //     return a.price - b.price;
  //   });

    // console.log(sorted)
    // console.log(drinkData)
    // setIsSorted(true);
  //   setLst(sorted);
  // }

  const reset = () => {
    sorted = [...drinkData];
    setSort("none");
  }

  const filter = (temp) => {
    let filtered = [...drinkData].filter(function (item) {
      return item.temp == temp;
    });
    // setLst(sorted);
    console.log(filtered)
    setLst(filtered)
  }

  const [sort, setSort] = React.useState("none");
  const handlePriceAscend = () => {
    let sorted = [...lst].sort((a,b) => {
      return a.price - b.price;
    });
    setLst(sorted);
    setSort("ascend");
  };

  const handlePriceDescend = () => {
    let sorted = [...lst].sort((a,b) => {
      return b.price - a.price;
    });
    setLst(sorted);
    setSort("descend");
  };

  const RadioButton = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="radio" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  return (
    <div className="App">
      <h1>Queen Bean Café</h1> {}
      {lst.map((item) => ( // map drinkData to DrinkItem components
        <p>
          <DrinkItem name = {item.name} image = {item.image} desc = {item.description} price = {item.price} addToCart = {addItemToCart}/>
        </p> 
      ))}
   
      <div className="filter-container"> <h3>Sort By:</h3>
        <RadioButton
          label="None"
          value={sort === "none"}
          onChange={reset}
        />
        <RadioButton
          label="Price Low to High"
          value={sort === "ascend"}
          onChange={handlePriceAscend}
        />
        <RadioButton
          label="Price High to Low"
          value={sort === "descend"}
          onChange={handlePriceDescend}
        />

        {/* <Checkbox label = "Sort (Price Low - High)" /> */}
        <h3>Filters</h3>
        <h4>Temperature</h4>
        <button onClick={() => (filter("cold"))}>
        COLD beverages
        </button>
        <button onClick={() => (filter("hot"))}>
        HOT beverages
        </button>
        {/* <button onClick={reset}> */}
        {/* Reset */}
        {/* </button> */}
        <h3>Beverage Type</h3>
        Coffee
        Tea
        Other
        Show All
        {/* <h3>Temperature</h3> */}
        {/* <h4>Hot</h4>
        <h4>Cold</h4> */}
      </div>

      <div className="cart-container">
          <h2>My Cart ({totalQuantity})</h2>
          {Object.values(cart).map((item, index) => (
            <p>
              {item.quantity}x {item.name}
            </p>
          ))}
          {/* {cart.map((item) => (
          <p>
            {item.quantity}x {item.name}
          </p> ))} */}
          <h3>Subtotal: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default App;