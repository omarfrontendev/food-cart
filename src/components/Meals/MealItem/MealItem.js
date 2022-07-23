import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import MealItemForm from "./MealItemForm";
import classes from './MealsItem.module.css';

const MealItem = props => {
    
    const CartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;
    
    const getItemDataHandler = amount => {
        CartCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: amount
        });
    }

    return (
        <li className={classes.meal}>
            <div>
                <div className={classes.name}><h3>{props.name}</h3></div>
                <div className={classes.desc}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onGetDataItem={getItemDataHandler} {...props.meal} />
            </div>
        </li>
    )
}
export default MealItem;