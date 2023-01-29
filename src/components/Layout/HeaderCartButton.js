import React,{useContext, useEffect, useState} from "react";

import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from "../../store/cart-context";

const HeaderCartButton=(props)=>{
    const cartCtx=useContext(CartContext)
    const numberOfCartItems=cartCtx.items.reduce((curNumber,item)=>{
        return curNumber+item.amount;
    },0);

    const [btnIsHighLighted,setBtnIsHighLighted]=useState(false);
    useEffect(()=>{
        if(cartCtx.items.length===0){
            return;
        }
        setBtnIsHighLighted(true);
        const timer=setTimeout(()=>{
            setBtnIsHighLighted(false);
        },300);
        return()=>{
            clearTimeout(timer);
        };
    },[cartCtx])
    
    const btnClasses=`${styles.button} ${btnIsHighLighted?styles.bump:''}`
    
    return(
        <button className={btnClasses} onClick={props.onShowCart} >
            <span className={styles.icon}>
                <CartIcon/>
            </span>
            <span>
                Your Cart
            </span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}
export default HeaderCartButton;