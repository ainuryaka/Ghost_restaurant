import { connect } from "react-redux";
import { Navbar, TopBar } from "../components";
import { decreaseQuantity, increaseQuantity } from "../redux/cartActions";
import { CartItem, IState } from "../redux/cartReducer";
import MenuItem from "../redux/item";

import { useState } from "react";
import ghostIcon from "../assets/ghost_mini.svg";
import "./styles/cart.scss";

interface CartProps {
    cart: IState;
}

interface CartEntryProps {
    item: CartItem;
    increaseQuantity: (item: MenuItem) => void;
    decreaseQuantity: (item: MenuItem) => void;
}

const mapStateToProps = (state: { cart: { items: CartItem[] } }) => ({
    cart: state.cart,
});

const mapDispatchToProps = {
    increaseQuantity,
    decreaseQuantity,
};

const CartEntry = ({
    item,
    increaseQuantity,
    decreaseQuantity,
}: CartEntryProps) => {
    return (
        <div className="entry">
            <section className="info">
                <img src={item.image} alt={item.name} />
                <div>
                    <h2>{item.name}</h2>
                    <span>{item.price}₸</span>
                </div>
            </section>
            <section className="quantity">
                <button onClick={() => decreaseQuantity(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item)}>+</button>
            </section>
        </div>
    );
};

const Entry = connect(mapStateToProps, mapDispatchToProps)(CartEntry);

const Cart = ({ cart }: CartProps) => {
    const items = cart.items;

    const [nameValue, setNameValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [cityValue, setCityValue] = useState("");
    const [addressValue, setAddressValue] = useState("");

    const handleSubmit = () => {
        fetch(`${import.meta.env.VITE_APP_API_URL}/orders`, {
            method: "POST",
            body: JSON.stringify({
                name: nameValue,
                phone: phoneValue,
                city: cityValue,
                address: addressValue,
                items: items.map((item) => ({
                    item_id: item.id,
                    quantity: item.quantity,
                })),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                alert("Order placed successfully");
            } else {
                alert("Something went wrong");
            }
        });
    };

    return (
        <>
            <TopBar />
            <Navbar selected="cart" />
            <main>
                <h1>Order</h1>
                <div className="checkout">
                    <div className="items">
                        {items.length == 0 ? (
                            <p className="empty">Your cart is empty</p>
                        ) : (
                            items.map((item) => <Entry item={item} />)
                        )}
                        <h2 className="total">
                            Total:{" "}
                            <span>
                                {items.reduce(
                                    (acc, item) =>
                                        acc + item.price * item.quantity,
                                    0
                                )}
                                ₸
                            </span>
                        </h2>
                    </div>
                    <div className="data">
                        <div className="row">
                            <div className="input">
                                <span>Name</span>
                                <input
                                    type="text"
                                    value={nameValue}
                                    onChange={(e) =>
                                        setNameValue(e.target.value)
                                    }
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="input">
                                <span>Phone</span>
                                <input
                                    type="text"
                                    value={phoneValue}
                                    onChange={(e) =>
                                        setPhoneValue(e.target.value)
                                    }
                                    placeholder="Enter your phone"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input">
                                <span>City</span>
                                <input
                                    type="text"
                                    value={cityValue}
                                    onChange={(e) =>
                                        setCityValue(e.target.value)
                                    }
                                    placeholder="Enter your city"
                                />
                            </div>
                            <div className="input">
                                <span>Address</span>
                                <input
                                    type="text"
                                    value={addressValue}
                                    onChange={(e) =>
                                        setAddressValue(e.target.value)
                                    }
                                    placeholder="Enter your address"
                                />
                            </div>
                        </div>
                        <button
                            className="button"
                            disabled={
                                nameValue == "" ||
                                phoneValue == "" ||
                                cityValue == "" ||
                                addressValue == ""
                            }
                            onClick={handleSubmit}
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            </main>
            <footer>
                <span className="logo">
                    <img src={ghostIcon} />
                    Phantom Taste
                </span>
                <span>© 2023 All Rights Reserved</span>
            </footer>
        </>
    );
};

export default connect(mapStateToProps)(Cart);
