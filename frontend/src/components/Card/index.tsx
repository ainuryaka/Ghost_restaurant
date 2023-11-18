import { useState } from "react";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartActions";
import { CartItem, IState } from "../../redux/cartReducer";
import MenuItem from "../../redux/item";

import "./style.scss";

interface CardProps {
    item: MenuItem;
    cart: IState;
    addToCart: (item: MenuItem) => void;
    removeFromCart: (item: MenuItem) => void;
}

const Card = ({ item, cart, addToCart, removeFromCart }: CardProps) => {
    const [added, setAdded] = useState(cart.items.some((i) => i.id == item.id));

    return (
        <div className="menu-item">
            <img src={item.image} alt={item.name} />
            <section>
                <div className="info">
                    <h3>{item.name}</h3>
                    <p className="description">
                        {item.description == undefined || item.description == ""
                            ? "No description"
                            : item.description}
                    </p>
                    {item.ingredients && (
                        <p className="ingredients">{item.ingredients}</p>
                    )}
                </div>
                <div className="actions">
                    <span>{item.price}₸</span>
                    <button
                        className={added ? "added" : ""}
                        onClick={() => {
                            added ? removeFromCart(item) : addToCart(item);
                            setAdded(!added);
                        }}
                    >
                        {added ? "Remove" : "Add to cart"}
                    </button>
                </div>
            </section>
        </div>
    );
};

const mapStateToProps = (state: { cart: { items: CartItem[] } }) => ({
    cart: state.cart,
});

const mapDispatchToProps = {
    addToCart,
    removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
