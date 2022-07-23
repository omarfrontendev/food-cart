
import { useRef} from 'react';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {

    const amountInputRef = useRef();

    const onSubmitHandler = event => {
        event.preventDefault();
        const enteredAmountValue = amountInputRef.current.value;
        props.onGetDataItem(enteredAmountValue);
    }

    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <Input
             label='Amount'
             ref={amountInputRef}
             input = {{
                 id: 'amount',
                 type: 'number',
                 min : '1',
                 max: '5',
                 defaultValue: '1',
                 step: '1',
             }}
            />
            <Button text='+ Add' button={{ type: 'submit'}}/>
        </form>
    )
};
export default MealItemForm;