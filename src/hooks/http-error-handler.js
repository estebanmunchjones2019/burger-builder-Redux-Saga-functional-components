import { useState, useEffect } from 'react';

const useError = (axios, isAuthPage) => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const resInterceptor = axios.interceptors.response.use(res => res, err => {
        if (isAuthPage) {
            setError(err.response.data.error.errors[0])
        } else {
            setError(err); //getting error in the response
        }
        return Promise.reject(err);
    });
    
    const errorConfirmedHandler = () => {
        setError(null); //fired clicking the backdrop
    };

    useEffect(() => { 
        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);// destroy the interceptors upon unmounting
        }
    }, [reqInterceptor, resInterceptor, axios.interceptors.request, axios.interceptors.response]);

    return {
        error: error,
        errorConfirmedHandler: errorConfirmedHandler
    }
}

export default useError;