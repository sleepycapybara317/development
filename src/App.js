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
  const [typeFilters, setTypeFilters] = React.useState([{"tea": false, "coffee": false, "other": false}]);

  const addItemToCart = (name, price) => {
    const updatedCart = {...cart};
    if (typeof updatedCart[name] == 'undefined') {
      updatedCart[name] = {name: name, quantity: 1};
    } else {
      updatedCart[name] = {name: name, quantity: updatedCart[name].quantity+1};
    }
    setCart(updatedCart)

    setTotalPrice((p) => price + p);  // add price to total price
    setTotalQuantity((q) => q + 1); // add 1 to total quantity
  };

  const reset = () => {
    // how to uncheck checkboxes ???
    // $('input[type=checkbox]').prop('checked', false);

    setTempFilters({"hot": false, "cold": false});
    setSort("none");
    setLst([...drinkData]);
  }

  const filterTemps = (temp) => {
    // set cold to true
    const updatedFilters = {...tempFilters};
    updatedFilters[temp] = !updatedFilters[temp];

    var toApply = [] // list of temps -- hot, cold
    Object.keys(updatedFilters).forEach((key) => {
      if (updatedFilters[key]) {toApply.push(key)}
    })

    if (toApply.length === 0) {
      setLst([...drinkData]);
      sortAgain([...drinkData])
    }
    else {
      const updatedLst = [...drinkData];
      const ans = [];
      updatedLst.forEach((drink) => 
        toApply.forEach((tempFilter) => {if (drink.temp === tempFilter) {ans.push(drink)}}))
        setLst(ans);
        sortAgain(ans)
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
      sortAgain([...drinkData])
    }
    else {
      const updatedLst = [...drinkData];
      const ans = [];
      updatedLst.forEach((drink) => 
        toApply.forEach((typeFilter) => {if (drink.type === typeFilter) {ans.push(drink)}}))
        // setLst(ans);
        sortAgain(ans);
        console.log(ans);
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

  const sortAgain = (newLst) => {
    console.log(newLst);
    let sorted = []
    if (sort === "ascend") {
      sorted = [...newLst].sort((a,b) => {
        return a.price - b.price;
      });
    }
    else if (sort === "descend") {
      sorted = [...newLst].sort((a,b) => {
        return b.price - a.price;
      });
    }
    else {
      sorted = [...drinkData];
    }
    // console.log(sorted);
    // setSort(str);
    setLst(sorted);
  }

  // how to FILTER then sort every time ???
  return (
    <div className="App">
      <h1>Queen Bean Café</h1> {}
      {lst.map((item) => ( // map drinkData to DrinkItem components
        <p>
          <DrinkItem 
          name = {item.name} 
          image = {item.image} 
          desc = {item.description} 
          price = {item.price} 
          cals = {item.calories} 
          type = {item.type} 
          addToCart = {addItemToCart}/>
        </p> 
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
          id = "coffee"
          label = "coffee" 
          value={typeFilters["coffee"]}
          onChange={() => filterTypes("coffee")}
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
        <button onClick={reset}>
        Reset
        </button> 
        {/* <h3>Beverage Type</h3>
        Coffee
        Tea
        Other
        Show All */}
        {/* <h3>Temperature</h3> */}
        {/* <h4>Hot</h4>
        <h4>Cold</h4> */}
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