/* eslint-disable jsx-a11y/alt-text */
import mealsImage from '../../../assets/ECOM_CD-8735_ReadyMeals_HEADER_MOB.jfif';
import classes from "./Header.module.css";
import HeaderCartButton from './HeaderCartButton';
const Header = props =>{

    return(
        <>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.onOpenCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage}/>
        </div>
        </>
    );

};

export default Header;