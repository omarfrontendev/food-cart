
import { useContext, useState } from "react";
import CartContext from "../../../store/cart-context";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";
import CartItem from "../CartItem/CartItem";
import CheckoutForm from "../Checkout/CheckoutForm";
import classes from './Cart.module.css';

const Cart = props => {
    const [checkoutShow, setCheckoutShow] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);
    const hasItems = cartCtx.items.length > 0;
    const TotalAmountNum = cartCtx.totalAmount.toFixed(2);
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const checkoutFormHandler = () => {
        setCheckoutShow(true);
    }

    const submitOrderHandler = async userData => {
        setIsSubmitting(true);
        await fetch('https://food-app-495a1-default-rtdb.europe-west1.firebasedatabase.app/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems =   <ul>
                            {cartCtx.items.map(cartItem => <CartItem key={cartItem.id} {...cartItem} onAdd={cartItemAddHandler} onRemove={cartItemRemoveHandler}/>)}
                        </ul>

    const cartContent = <>
                        {cartItems}
                        <div className={classes.total}>
                            <span>Total Amount</span>
                            <span>${TotalAmountNum}</span>
                        </div>
                            {!checkoutShow && <div className={classes.btns}>
                            <Button onClick={props.onCloseCart} text='Close' button={{type: 'button'}} class={classes['close-btn']}/>
                            {hasItems && <Button onClick={checkoutFormHandler} text='order' button={{type: 'button'}} class={classes['order-btn']}/>}
                        </div>}
                        {checkoutShow && <CheckoutForm onConfirm={submitOrderHandler} onClose={props.onCloseCart} />}
                        </>

    const isSubmittingNow = <p>Sending....</p>
    const successfullySubmitting =  <>
                                        <p>Successfully Submitting</p>
                                        <Button onClick={props.onCloseCart} text='Close' button={{type: 'button'}} class={classes['close-btn']}/>
                                    </>
    return(
        <div className={classes.overlay}>
            <Card class={`${classes.card} ${classes['show-card']}`}>
                {!isSubmitting && !didSubmit && cartCtx.items.length > 0 && cartContent}
                {isSubmitting && isSubmittingNow}
                {!isSubmitting && didSubmit && successfullySubmitting}
                {cartCtx.items.length === 0 &&  <Button onClick={props.onCloseCart} text='Close' button={{type: 'button'}} class={classes['close-btn']}/> }
            </Card>
        </div>
    )

}
export default Cart;