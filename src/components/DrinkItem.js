import "./DrinkItem.css";

// TODO: create a component that displays a single bakery item
export default function DrinkItem(props) {
    const add = props.addToCart;
    return(
    <div className="itemCard">
        <div className="img-container">
            <img src={props.image} alt = {props.name} />
        </div>
        <div className="desc-container">
            <div className="name">{props.name}</div>
            <div className="desc">{props.desc}</div>
            <div className="price">${props.price}</div>
            <button onClick={() => (add(props.name, props.price))} className="addButton">
            Add to Cart
            </button>
        </div>
    </div>
    )
}