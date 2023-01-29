import { useRef,useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty=value=>value.trim()==='';
const isFiveChars=value=>value.trim().length===5;
const Checkout = (props) => {

    const [formInputValidity, setFormInputValidity] = useState({
        name:true,
        street:true,
        city:true,
        postalCode:true
    })
    const nameInputRef=useRef();
    const streetRef=useRef();
    const cityRef=useRef();
    const postalCodeRef=useRef();
    
    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName=nameInputRef.current.value;
        const enteredStreet=streetRef.current.value;
        const enteredCity=cityRef.current.value;
        const enteredPostalCode=postalCodeRef.current.value;

        const enteredNameIsValid=!isEmpty(enteredName);
        const enteredStreetIsValid=!isEmpty(enteredStreet);
        const enteredCityIsValid=!isEmpty(enteredCity);
        const enteredPostalCodeISValid=isFiveChars(enteredPostalCode);

        setFormInputValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            city:enteredCityIsValid,
            postalCode:enteredPostalCodeISValid
        })

        const formIsValid=enteredNameIsValid&&enteredStreetIsValid&&enteredCityIsValid&&enteredPostalCodeISValid;

        if(!formIsValid){
            return;
        }
        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            postalCode:enteredPostalCode
        });
    };


    return (
        <form action="" className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Your Name</label>
                <input type="text" ref={nameInputRef} id='name' />
                {!formInputValidity.name&&<p>Please Enter A Valid Name !</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor="street">Street</label>
                <input type="text" ref={streetRef} id='street' />
                {!formInputValidity.street&&<p>Please Enter A Valid Street !</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor="city">City</label>
                <input type="text" ref={cityRef} id='city' />
                {!formInputValidity.city&&<p>Please Enter A Valid City !</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" ref={postalCodeRef} id='postal' />
                {!formInputValidity.postalCode&&<p>Please Enter A Valid Postal Code !</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
};
export default Checkout;