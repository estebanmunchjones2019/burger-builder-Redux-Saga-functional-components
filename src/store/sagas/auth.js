import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from '../actions/index';
import axios from '../../axios-auth';
const API_KEY = 'AIzaSyA_p-OU93SSP8qTBlxi6NJVIrBwK9F5nTA';

export function* logoutSaga(action) {
    yield call([localStorage,'removeItem'], "token"); //better for testing
    // yield localStorage.removeItem('token'); //yield is like await
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed()); //yield is not neccessary in this function
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime*1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    put(actions.authStart())
    let url = `accounts:signInWithPassword?key=${API_KEY}`;
    if (!action.isLogin) {
        url = `accounts:signUp?key=${API_KEY}`
    }
    
    try {
        const res = yield axios.post(url, 
            {
                email: action.email,
                password: action.password,
                returnSecureToken: true
            }
        )
        console.log('success response',res);
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId)
        yield put(actions.authSuccess(res.data));
        yield put(actions.checkAuthTimeOut(res.data.expiresIn));
        
    } catch(error) {
        yield put(actions.authFail(error.response));
    }
}

export function* authCheckStateSaga(action) {
    const token = localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate > new Date()) {
            const userId = localStorage.getItem('userId');
            const authData = { 
                idToken: token,
                localId: userId
            }
            const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000; //in seconds
            yield put(actions.checkAuthTimeOut(expiresIn));
            yield put(actions.authSuccess(authData))
        } else {
            yield put(actions.logout());
        }
    }
}