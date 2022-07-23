
import { useState, useEffect } from "react";
import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";
import classes from './AvailableMeals.module.css'

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeals = async ()=> {
            setError(null)
            const response = await fetch('https://facebookauth-98a65-default-rtdb.firebaseio.com/meals.json');
            
            if(!response.ok) {
                throw new Error('Something Went Wrong');
            }
            
            const data =  await response.json();

            console.log(data)
    
            const loadedMeals = [];
            for(const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                });
            };
            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch(error => {
            setIsLoading(false);
            setError(error.message)
        });

    }, []);

    const mealList = meals.map(meal=> <MealItem key={meal.id} {...meal}/>);
    return(
        <section className={classes.meals}>
            <Card class={classes.bump}>
                <ul>
                    {mealList}
                    {isLoading && <p className={classes.loading}>Loading...</p>}
                    {error && !isLoading && <p className={classes.loading}>{error}</p>}
                </ul>
            </Card>
        </section>
    )
};
export default AvailableMeals;