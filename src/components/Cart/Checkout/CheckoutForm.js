import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import classes from './CheckoutForm.module.css';
import useInput from '../../../hooks/use-inputs';

const CheckoutForm = props => {

    const {
        value: enteredName,
        valid: validName,
        error: errorName,
        onChange: nameChangeHandler,
        onBlur: nameBlurHandler,
        onReset: nameResetHandler
    } = useInput(enteredName => enteredName.trim() !== '');
    const {
        value: enteredPostal,
        valid: validPostal,
        error: errorPostal,
        onChange: postalChangeHandler,
        onBlur: postalBlurHandler,
        onReset: postalResetHandler
    } = useInput(enteredPostal => enteredPostal.trim() !== '');
    const {
        value: enteredStreet,
        valid: validStreet,
        error: errorStreet,
        onChange: streetChangeHandler,
        onBlur: StreetBlurHandler,
        onReset: StreetResetHandler
    } = useInput(enteredStreet => enteredStreet.trim().length > 0);
    const {
        value: enteredCity,
        valid: validCity,
        error: errorCity,
        onChange: cityChangeHandler,
        onBlur: cityBlurHandler,
        onReset: cityResetHandler
    } = useInput(enteredCity => enteredCity.trim() !== '');

    let validForm = false;

    if(validName && validStreet && validCity && validPostal) {
        validForm = true;
    };

    const submitCheckoutHandler = e => {
        e.preventDefault();
        if(errorName || errorStreet || errorPostal || errorCity) {
            return;
        };

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostal,
            city: enteredCity
        });

        nameResetHandler();
        StreetResetHandler();
        postalResetHandler();
        cityResetHandler();
    }

    const btnOrderClass = validForm ? classes['order-btn'] :  classes.innActive;
    
    const inputNameClass = errorName ? classes.inputError : classes['checkout-input'];
    const inputStreetClass = errorStreet ? classes.inputError : classes['checkout-input'];
    const inputPostalClass = errorPostal ? classes.inputError : classes['checkout-input'];
    const inputCityClass = errorCity ? classes.inputError : classes['checkout-input'];

    const errorNameMessage = <p className={classes['error-msg']}>This Field Can't Be Empty</p>
    const errorPostalMessage = <p className={classes['error-msg']}>The Character More Than 7</p>

    return (
        <form onSubmit={submitCheckoutHandler}>
            <Input class={inputNameClass}
                label='Your Name'
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler} 
               input={{id: 'username', type: 'text', value: enteredName}}
            />
            {errorName && errorNameMessage}

            <Input class={inputStreetClass}
                label='Street'
                onChange={streetChangeHandler}
                onBlur={StreetBlurHandler} 
                input={{id: 'street', type: 'text', value: enteredStreet}}
            />
            {errorStreet && errorNameMessage}
            <Input class={inputPostalClass}
                label='Postal Code'
                onChange={postalChangeHandler}
                onBlur={postalBlurHandler} 
                input={{id: 'postal', type: 'text', value: enteredPostal}} 
            />
            {errorPostal && errorPostalMessage}

            <Input class={inputCityClass}
                label='City'
                onChange={cityChangeHandler}
                onBlur={cityBlurHandler} 
                input={{id: 'city', type: 'text', value: enteredCity}} 
            />
            {errorCity && errorNameMessage}

            <Button class={btnOrderClass} text='Confirm' button={{type: 'submit'}}/>
            <Button onClick={props.onClose} text='Close' button={{type: 'button'}} class={classes['order-btn']}/>
        </form>
    );
};

export default CheckoutForm;