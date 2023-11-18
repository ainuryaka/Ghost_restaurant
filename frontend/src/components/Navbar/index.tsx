import { Link } from "@tanstack/react-router";

import cartIcon from "../../assets/cart.svg";
import ghostIcon from "../../assets/ghost.svg";

import { connect } from "react-redux";
import { CartItem, IState } from "../../redux/cartReducer";
import "./style.scss";

interface NavbarProps {
    selected?: string;
    cart: IState;
}

const Navbar = ({ selected, cart }: NavbarProps) => {
    const cartItemCount = cart.items.reduce(
        (count, item) => count + item.quantity,
        0
    );

    return (
        <nav>
            <span className="logo">
                <img src={ghostIcon} />
                Phantom Taste
            </span>
            <section>
                <Link to="/" className={selected == "home" ? "selected" : ""}>
                    Home
                </Link>
                <Link
                    to="/menu"
                    className={selected == "menu" ? "selected" : ""}
                    search={{
                        tag: "",
                    }}
                >
                    Menu
                </Link>
                <Link to="/" className={selected == "about" ? "selected" : ""}>
                    About us
                </Link>
                <Link
                    to="/"
                    className={selected == "contact" ? "selected" : ""}
                >
                    Contact
                </Link>
            </section>
            <Link to="/cart" className="cart">
                <span className="cart-count">{cartItemCount}</span>
                <img src={cartIcon} />
            </Link>
        </nav>
    );
};

const mapStateToProps = (state: { cart: { items: CartItem[] } }) => ({
    cart: state.cart,
});

export default connect(mapStateToProps)(Navbar);
