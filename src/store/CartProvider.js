import { useReducer } from "react";
import CartContext from "./cart-context";


const defaultCartState = {
    items: [] ,
    totalAmount: 0,
}
const cartReducer = (state,action)=>{
    let updatedItems;
    let updatedTotalAmount;
    if(action.type === 'ADD') {   
        updatedTotalAmount = state.totalAmount + action.itemAction.price * action.itemAction.amount;
        const matchItemsIndex = state.items.findIndex(item => item.id === action.itemAction.id);
        const matchedItem = state.items[matchItemsIndex];
        
        if(matchedItem){
            const matchedItemUpdated = {...matchedItem, amount: +action.itemAction.amount + +matchedItem.amount}
            updatedItems = [...state.items];
            updatedItems[matchItemsIndex] = matchedItemUpdated
        }else {
            updatedItems = state.items.concat(action.itemAction);
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === 'REMOVE') {
        const removedItemIndex = state.items.findIndex(item => item.id === action.idAction);
        const removeItem = state.items[removedItemIndex];
        updatedTotalAmount = state.totalAmount - removeItem.price;
        // if()
        if(+removeItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.idAction);
        }else {
            const updatedItem = {...removeItem, amount: removeItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[removedItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'CLEAR') {
        return defaultCartState;
    }

    return defaultCartState;

};

const CartProvider = props => {

    const [cartState,dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const AddItemToCart = item => {
        dispatchCartAction({type: "ADD", itemAction: item})
    };
    const removeItemToCart = id => {
        dispatchCartAction({type: "REMOVE", idAction: id})
    };

    const clearItemsHandler = () => {
        dispatchCartAction({type: "CLEAR"});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: AddItemToCart,
        removeItem: removeItemToCart,
        clearCart: clearItemsHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;