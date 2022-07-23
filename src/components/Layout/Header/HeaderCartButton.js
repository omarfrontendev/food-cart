import { useContext } from "react";
import CartContext from '../../../store/cart-context';
import CartIcon from "../../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';


const HeaderCartButton = props =>{

    const cartCtx = useContext(CartContext);

    // const numCartOfItems = cartCtx.items.length;
    const numCartOfItems = cartCtx.items.reduce((curNum, item) => {
        return +curNum + +item.amount
    },0);

    return (
        <button onClick={props.onClick} className={classes.button}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{+numCartOfItems}</span>
        </button>
    )
};
export default HeaderCartButton;