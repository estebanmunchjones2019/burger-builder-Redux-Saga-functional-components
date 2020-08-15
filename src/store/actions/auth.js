import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            authData: authData
        }
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: {
            error: error
        }
    }
}

export const auth = (email, password, isLogin) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password,
        isLogin: isLogin
    }
}

export const checkAuthTimeOut = (expirationTime) => {
   return {
       type: actionTypes.AUTH_CHECK_TIMEOUT,
       expirationTime: expirationTime
   }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
} 

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        payload: {
            authRedirectPath: path
        }
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_INITIAL_STATE
    }
}