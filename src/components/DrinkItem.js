import "./DrinkItem.css";

// TODO: create a component that displays a single bakery item
export default function DrinkItem(props) {
    const add = props.addToCart;
    const temp = props.temp;
    const type = props.type;
    const price = props.price;
    return(
    <div className="itemCard">
        <div className="img-container">
            <img src={props.image} alt = {props.name} />
        </div>
        <div className="desc-container">
            <div className="name">{props.name}</div>
            <div className="desc">{props.desc}</div>
            <div className="cals">{props.cals} calories</div>
            <div className="price">${price}</div>
            <button onClick={() => (add(props.name, price))} className="addButton">
            Add to Cart
            </button>
        </div>
    </div>
    )
}