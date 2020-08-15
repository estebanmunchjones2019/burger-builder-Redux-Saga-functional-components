import * as actionTypes from './actionTypes';

export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        payload: {
            order: {
                orderId: id,
                orderData: orderData
            }
        }
    }
}

export const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        payload: {
            error: error
        }
    }
}

export const purchaseStartLoading = () => {
    return {
        type: actionTypes.PURCHASE_START_LOADING
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseStart = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_START,
        orderData: orderData,
        token: token
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
            orders
        }
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        payload: {
            error: error //error is passed as payload but is not used in the end
        }
    }
}

export const fetchOrdersStart = () => {
    return {
       type: actionTypes.FETCH_ORDERS_START 
    }
}

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        token: token,
        userId: userId
    }
}


