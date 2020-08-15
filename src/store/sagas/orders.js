import * as actions from '../actions/index';
import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

export function* purchaseStartSaga(action) {
    yield put(actions.purchaseStartLoading());
    try {
        const res =  yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
        yield put(actions.purchaseSuccess(res.data.name, action.orderData));
    } catch(error) {
        yield  put(actions.purchaseFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = '?auth='+ action.token + '&orderBy="userId"&equalTo="' + action.userId + '"' ;
    try {
        const res = yield axios.get(`/orders.json${queryParams}`)
        const fetchedOrders = [];
        for (let key in res.data){ 
            fetchedOrders.push({
                ...res.data[key], 
                id: res.data[key].name
            })
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders))
    } catch(error) {
        yield put(actions.fetchOrdersFail(error))
    }
}
       
       