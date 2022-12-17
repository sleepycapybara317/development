import "./App.css";
import drinkData from "./assets/drink-data.json";
import DrinkItem from "./components/DrinkItem";
import Checkbox from "./components/Checkbox";
import RadioButton from "./components/RadioButton";
import React, { useState } from 'react';

function App() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cart, setCart] = useState({});
  const [lst, setLst] = useState([...drinkData]);
  const [sort, setSort] = React.useState("none");
  const [tempFilters, setTempFilters] = React.useState({"hot": false, "cold": false});
  const [typeFilters, setTypeFilters] = React.useState({"tea": false, "coffee": false, "other": false});

  const addItemToCart = (name, price) => {
    const updatedCart = {...cart};
    if (typeof updatedCart[name] == 'undefined') {
      updatedCart[name] = {name: name, quantity: 1};
    } else {
      updatedCart[name] = {name: name, quantity: updatedCart[name].quantity+1};
    }
    setTotalPrice((p) => price + p);  // add price to total price
    setTotalQuantity((q) => q + 1); // add 1 to total quantity
    setCart(updatedCart)
  };

  const remove = (name, price) => {
    let updatedCart = {...cart};
    if (typeof updatedCart[name] != 'undefined') {
      let removed = {}
      // decrease quantity or remove from cart dictionary
      Object.keys(updatedCart).forEach((key) => {
        if (updatedCart[key].name == name) {
          let quant = updatedCart[key].quantity
          if (quant > 1) {
            removed[key] = {name: name, quantity: updatedCart[key].quantity-1}
          }
        }
        else {
          removed[key] = {name: updatedCart[key].name, quantity: updatedCart[key].quantity}
        }
      })
      // console.log(removed)
      setTotalPrice((p) => p - price);  // sub price from total price
      setTotalQuantity((q) => q - 1); // sub 1 from total quantity
      setCart(removed)
    }
  };

  const reset = () => {
    setTempFilters({"hot": false, "cold": false});
    setTypeFilters({"tea": false, "coffee": false, "other": false});
    setSort("none");
    setLst([...drinkData]);
  }

  const filterTemps = (temp) => {
    // set cold to true
    const updatedFilters = {...tempFilters};
    updatedFilters[temp] = !updatedFilters[temp];

    var toApply = [] // list of temps -- hot, cold
    Object.keys(updatedFilters).forEach((key) => {
      if (updatedFilters[key]) {toApply.push(key);}
    })

    if (toApply.length === 0) {
      setLst([...drinkData]);
      sortAgain([...drinkData], "temp")
    }
    else {
      const updatedLst = [...drinkData]; //...drinkData
      const ans = [];
      updatedLst.forEach((drink) => 
        toApply.forEach((tempFilter) => {if (drink.temp === tempFilter) {ans.push(drink)}}))
        setLst(ans);
        sortAgain(ans, "temp")
    }
    setTempFilters(updatedFilters);
  }

  const filterTypes = (type) => {
    const updatedFilters = {...typeFilters};
    updatedFilters[type] = !updatedFilters[type];

    var toApply = [] // list of temps -- hot, cold
    Object.keys(updatedFilters).forEach((key) => {
      if (updatedFilters[key]) {toApply.push(key)}
    })

    if (toApply.length === 0) {
      setLst([...drinkData]);
      sortAgain([...drinkData], "type")
    }
    else {
      const updatedLst = [...drinkData];
      const ans = [];
      updatedLst.forEach((drink) => 
        toApply.forEach((typeFilter) => {if (drink.type === typeFilter) {ans.push(drink)}}))
        // setLst(ans);
      sortAgain(ans, "type");
        // console.log(lst);
    }
    setTypeFilters(updatedFilters);
  }

  const handleSort = (str) => {
    let sorted = []
    if (str === "ascend") {
      sorted = [...lst].sort((a,b) => {
        return a.price - b.price;
      });
    }
    else if (str === "descend") {
      sorted = [...lst].sort((a,b) => {
        return b.price - a.price;
      });
    }
    else {
      sorted = [...drinkData];
    }
    setSort(str);
    setLst(sorted);
  }

  const sortAgain = (newLst, filt) => {
    // console.log(filt);
    let filtered = [...newLst]
    // console.log(filtered);

    // RE-FILTER
    if (filt === "temp") {
      const updatedFilters = {...typeFilters};

      var toApply = [] // list of temps -- hot, cold
      Object.keys(updatedFilters).forEach((key) => {
        if (updatedFilters[key]) {toApply.push(key)}
      })

      if (toApply.length > 0) {
        const updatedLst = [...filtered];
        const ans = [];
        updatedLst.forEach((drink) => 
        toApply.forEach((typeFilter) => {if (drink.type === typeFilter) {ans.push(drink)}}))
        filtered = ans;
      };
    }
    // console.log(filtered);

    if (filt === "type") {
      // set cold to true
      const updatedFilters = {...tempFilters};

      var toApply = [] // list of temps -- hot, cold
      Object.keys(updatedFilters).forEach((key) => {
        if (updatedFilters[key]) {toApply.push(key);}
      })

      if (toApply.length > 0) {
        const updatedLst = [...filtered]; //...drinkData
        const ans = [];
        updatedLst.forEach((drink) => 
        toApply.forEach((tempFilter) => {if (drink.temp === tempFilter) {ans.push(drink)}}))
        filtered = ans;
      };
    }
    // console.log(filtered);
    
    // RE-SORT
    let sorted = []
    if (sort === "ascend") {
      sorted = filtered.sort((a,b) => {
        return a.price - b.price;
      });
    }
    else if (sort === "descend") {
      sorted = filtered.sort((a,b) => {
        return b.price - a.price;
      });
    }
    else {
      // sorted = [...drinkData];
      sorted = filtered;
    }
    // console.log(sorted);
    // setSort(str);
    setLst(sorted);
  }

  return (
    <div className="App">
      <h1>Queen Bean Café</h1> {}
      {lst.map((item) => ( // map drinkData to DrinkItem components
          <DrinkItem 
          name = {item.name} 
          image = {item.image} 
          desc = {item.description} 
          price = {item.price} 
          cals = {item.calories} 
          type = {item.type} 
          addToCart = {addItemToCart}
          remove = {remove}
          />
      ))}
   
      <div className="filter-container"> 
        <h3>Filters</h3>
        <h4>Temperature</h4>
        <Checkbox 
          id = "cold"
          label = "Cold" 
          value={tempFilters["cold"]}
          onChange={() => filterTemps("cold")}
          />
        <Checkbox 
          id = "hot"
          label = "Hot"
          value={tempFilters["hot"]} // checked when include, otherwise false
          onChange={() => filterTemps("hot")}
          />

        <h4>Beverage Type</h4>
        <Checkbox 
          id = "Coffee"
          label = "Coffee" 
          value={typeFilters["coffee"]}
          onChange={() => filterTypes("coffee")}
          />
        <Checkbox 
          id = "Tea"
          label = "Tea" 
          value={typeFilters["tea"]}
          onChange={() => filterTypes("tea")}
          />
        <Checkbox 
          id = "Other"
          label = "Other" 
          value={typeFilters["other"]}
          onChange={() => filterTypes("other")}
          />
        
        <h3>Sort By:</h3>
        <RadioButton
          label="Popular"
          value={sort === "none"}
          onChange={() => handleSort("none")}
        />
        <RadioButton
          label="Price Low to High"
          value={sort === "ascend"}
          onChange={() => handleSort("ascend")}
        />
        <RadioButton
          label="Price High to Low"
          value={sort === "descend"}
          onChange={() => handleSort("descend")}
        />
        <button onClick={reset} className="resetButton">
        Reset
        </button>
      </div>

      <div className="cart-container">
          <h2>My Cart ({totalQuantity})</h2>
          {Object.values(cart).map((item) => (
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