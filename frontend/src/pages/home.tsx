import { Link } from "@tanstack/react-router";
import { Navbar, TopBar } from "../components";

import "./styles/home.scss";

import american from "../assets/american.png";
import asian from "../assets/asian.png";
import eastern from "../assets/eastern.png";
import european from "../assets/european.png";
import kazakh from "../assets/kazakh.png";

import delivery from "../assets/delivery.svg";
import local from "../assets/local.svg";
import money from "../assets/money.svg";
import variety from "../assets/variety.svg";

import glovo from "../assets/glovo.png";
import mission from "../assets/mission.png";
import wolt from "../assets/wolt.png";
import yandex from "../assets/yandex.png";

import ghostIcon from "../assets/ghost_mini.svg";

interface MenuCardProps {
    name: string;
    image: string;
    description: string;
}

const MenuCard = ({ name, image, description }: MenuCardProps) => {
    return (
        <div className="menu-card">
            <div>
                <img src={image} alt={name} />
            </div>
            <section>
                <h3>{name}</h3>
                <p>{description}</p>
            </section>
            <Link
                to="/menu"
                search={{
                    tag: "",
                }}
            >
                Explore menu
            </Link>
        </div>
    );
};

const Home = () => {
    return (
        <>
            <TopBar />
            <Navbar selected="home" />
            <header>
                <section className="text">
                    <h1>Welcome to our Ghost Restaurant</h1>
                    <h3>Ready to embark on a gastronomic journey?</h3>
                </section>
                <Link
                    to="/menu"
                    className="button"
                    search={{
                        tag: "",
                    }}
                >
                    Order now
                </Link>
            </header>
            <div className="browse">
                <h2>Browse menu</h2>
                <div className="menu-cards">
                    <MenuCard
                        name="Kazakh"
                        image={kazakh}
                        description="Hearty flavors of rich culinary traditions"
                    />
                    <MenuCard
                        name="Asian"
                        image={asian}
                        description="Aromatic and spicy flavors from the East"
                    />
                    <MenuCard
                        name="European"
                        image={european}
                        description="Delicious and refined dishes from Europe"
                    />
                    <MenuCard
                        name="American"
                        image={american}
                        description="Classic dishes from the Americas"
                    />
                    <MenuCard
                        name="Eastern"
                        image={eastern}
                        description="Authentic dishes from the Middle East"
                    />
                </div>
            </div>
            <div className="mission">
                <img src={mission} alt="Mission" />
                <section>
                    <h1>
                        We're dedicated to bringing the world's diverse culinary
                        traditions right to your doorstep
                    </h1>
                    <p>
                        Our mission is simple - to serve delicious food that
                        brings people together. At Phantom Taste, our passion
                        lies in crafting dishes that span the globe. Our team of
                        expert chefs meticulously prepares each dish to ensure
                        an authentic and memorable dining experience.
                    </p>
                    <span>
                        Join us and embark on a worldwide culinary adventure
                        without leaving your home.
                    </span>
                    <Link to="/" className="button">
                        Explore menu
                    </Link>
                </section>
            </div>
            <div className="why-us">
                <h1>Why people choose us?</h1>
                <section>
                    <div className="card">
                        <div>
                            <img src={variety} />
                        </div>
                        <h3>Cuisine Variety</h3>
                        <p>
                            We offer an extensive menu featuring so you can find
                            the perfect meal for any occasion.
                        </p>
                    </div>
                    <div className="card">
                        <div>
                            <img src={local} />
                        </div>
                        <h3>Local Sourcing</h3>
                        <p>
                            We support local suppliers and farmers, providing
                            you with fresh, locally-sourced ingredients
                        </p>
                    </div>
                    <div className="card">
                        <div>
                            <img src={delivery} />
                        </div>
                        <h3>Timely Delivery</h3>
                        <p>
                            We prioritize punctual and efficient delivery,
                            ensuring that your meals arrive promptly and at the
                            peak of freshness.
                        </p>
                    </div>
                    <div className="card">
                        <div>
                            <img src={money} />
                        </div>
                        <h3>Affordability</h3>
                        <p>
                            Our prices are competitive and designed to
                            accommodate various budgets.
                        </p>
                    </div>
                </section>
            </div>
            <div className="partners">
                <section>
                    <h1>You can enjoy the culinary delights through apps</h1>
                    <h4>
                        We've made ordering your favorite dishes as easy as
                        possible
                    </h4>
                </section>
                <div className="apps">
                    <img src={yandex} alt="Yandex" />
                    <img src={wolt} alt="Wolt" />
                    <img src={glovo} alt="Glovo" />
                </div>
            </div>
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

export default Home;
