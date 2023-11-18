import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import searchIcon from "../assets/search.svg";
import { Card, Navbar, TopBar } from "../components";
import MenuItem from "../redux/item";
import "./styles/menu.scss";

const Menu = () => {
    const searchParams = useSearch({ from: "/menu" });
    const [search, setSearch] = useState(
        (searchParams as { tag: string }).tag ?? ""
    );
    const [menu, setMenu] = useState<MenuItem[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_APP_API_URL}/menu?search=${search}`, {
            method: "GET",
        }).then((response) => {
            response.json().then((menu: MenuItem[]) => setMenu(menu));
        });
    }, [search]);

    return (
        <>
            <TopBar />
            <Navbar selected="menu" />
            <main>
                <h1>Menu</h1>
                <div className="search">
                    <img src={searchIcon} />
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>
                <div className="menu">
                    {menu.map((item) => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            </main>
        </>
    );
};

export default Menu;
