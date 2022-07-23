import { useState } from "react";
const useInput = (validate) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [inputTouched, setInputTouched] = useState(false);

    const validValue = validate(enteredValue) ;
    const inputInvalid = !validValue && inputTouched;

    const inputChangeHandler = e => {
        setEnteredValue(e.target.value);
    };
    const inputBlurHandler = () => {
        setInputTouched(true);
    }
    const resetInput = () => {
        setEnteredValue('');
        setInputTouched(false);
    }

    return {
        value: enteredValue,
        valid: validValue,
        error: inputInvalid,
        onChange: inputChangeHandler,
        onBlur: inputBlurHandler,
        onReset: resetInput
    }

};
export default useInput;