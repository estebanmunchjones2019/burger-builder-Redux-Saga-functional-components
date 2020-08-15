import * as actions from '../actions/index';
import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

export function* initIngredientsSaga(action) {
    try {
        const res = yield axios.get('https://myburger-6cf58.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(res.data));
    } catch(error) {
        yield put(actions.fetchIngredientsFailed());
    }
}