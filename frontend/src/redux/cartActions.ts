import MenuItem from "./item";

export const addToCart = (item: MenuItem) => ({
    type: "ADD_TO_CART",
    payload: item,
});

export const removeFromCart = (item: MenuItem) => ({
    type: "REMOVE_FROM_CART",
    payload: item,
});

export const increaseQuantity = (item: MenuItem) => ({
    type: "INCREASE_QUANTITY",
    payload: item,
});

export const decreaseQuantity = (item: MenuItem) => ({
    type: "DECREASE_QUANTITY",
    payload: item,
});
