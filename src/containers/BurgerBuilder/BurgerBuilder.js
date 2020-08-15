import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../axios-orders';
import { useDispatch, useSelector } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = props =>{
    //exported to used isolated from store in tests

    const [purchasing, setPurchasing] = useState(false);

    const ings = useSelector(state => state.burgerBuilder.ingredients);

    const price = useSelector(state => state.burgerBuilder.totalPrice);
    
    const error = useSelector(state => state.burgerBuilder.error);

    const isAuth = useSelector(state => state.auth.token !== null);
     
    const dispatch = useDispatch();

    const onIngredientAdded =  (type) => dispatch(actions.addIngredient(type));
    const onIngredientRemoved = (type) => dispatch(actions.removeIngredient(type));
    const onInitIngredients =  useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onPurchaseInit = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));
    
    const updatePurchasableState = (updatedIngredients) => {
        const ingredients = updatedIngredients;
        const sum = Object.keys(ingredients)// return ['salad', 'meat'...]
        .map((igKey) => {
            return ingredients[igKey];// return [2,1,3...]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0 ;
    }

    const purchaseHandler = () => { // I could use one method togglePurchaseHandler and toggle the prevState
        if (!isAuth) {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
        setPurchasing(true);
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onPurchaseInit();
        props.history.push('/checkout');   
    }

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]); //onInitIngredients in not recreated because it's cached by useCallback

    const disabledInfo = {...ings};
    for (let key in disabledInfo) { //it returns and object {salad: true, meat: false, ...}
        disabledInfo[key] = disabledInfo[key] <= 0; //if it has true, that ingredient should be disabled
    }
    
    let orderSummary = null;
    let burger = error ? 
        <p>Could not get ingredients from the server</p>    
        : <Spinner />;
    if ( ings) {
        orderSummary = <OrderSummary 
            purchaseCancelled={purchaseCancelHandler} 
            ingredients={ings}
            purchaseContinued={purchaseContinueHandler}
            totalPrice={price}>
        </OrderSummary>;
        burger = <React.Fragment>
        <Burger ingredients={ings}/>
        <BuildControls 
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            price={price}
            purchasable={updatePurchasableState(ings)}
            ordered={purchaseHandler}
            isAuth={isAuth}/>
    </React.Fragment>
    }

    return (
        <React.Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary} 
            </Modal>
            {burger}
        </React.Fragment>
    )
}

export default withErrorHandler(BurgerBuilder, axios, false); //withErrorHandler return JSX 
//with the Modal (if there's an error) and BurgerBuilder at the same level
//the error managed in store is for stopping the spinner if there's an error.