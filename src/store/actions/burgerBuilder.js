import * as actionTypes from './actionTypes';

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: {
            ingredients: ingredients
        }
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
}

export const initIngredients  = () => {
        return {
            type: actionTypes.INIT_INGREDIENTS
        }
}

export const addIngredient = (type) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload : {
            type: type
        }
    }
}

export const removeIngredient = (type) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload : {
            type: type
        }
    }
}

