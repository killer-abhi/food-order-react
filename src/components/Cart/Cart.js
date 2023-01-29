import React, { useContext, useState } from "react";

import styles from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from '../../store/cart-context';
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setIsSubmit] = useState(false);

    const cartItemRemoveHandler = id => {
        console.log(id);
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-hhtp-e6d6f-default-rtdb.firebaseio.com/mealOrders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setIsSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = <ul className={styles[`cart-items`]} >
        {cartCtx.items.map((item) => (
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        ))}
    </ul>;

    const orderHandler = () => {
        setIsCheckingOut(true);
    }
    const modalActions = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={styles.button} onClick={orderHandler} >Order</button>}
    </div>

    const cartModalContent = <React.Fragment>
        <div>
            {cartItems}
        </div>
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckingOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />}
        {!isCheckingOut && modalActions}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending Order Data ...</p>
    const didSubmitModalContent = <React.Fragment>
        <p>Successfully sent the Order Data!</p>
        <div className={styles.actions}>
            <button className={styles.button} onClick={props.onHideCart}>Close</button>
        </div>
    </React.Fragment>
    return (
        <Modal onClose={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};
export default Cart;