import MenuItem from "./item";

export interface CartItem extends MenuItem {
    quantity: number;
}

export interface IState {
    items: CartItem[];
}

const initialState: IState = {
    items: [],
};

const cartReducer = (state: IState = initialState, action: any) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const newItem: CartItem = { ...action.payload, quantity: 1 };
            return {
                ...state,
                items: [...state.items, newItem],
            };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                items: state.items.filter(
                    (item) => item.id !== action.payload.id
                ),
            };
        case "INCREASE_QUANTITY":
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };
        case "DECREASE_QUANTITY":
            return {
                ...state,
                items: state.items
                    .map((item) =>
                        item.id === action.payload.id
                            ? {
                                  ...item,
                                  quantity: Math.max(0, item.quantity - 1),
                              }
                            : item
                    )
                    .filter((item) => item.quantity > 0),
            };
        default:
            return state;
    }
};

export default cartReducer;
