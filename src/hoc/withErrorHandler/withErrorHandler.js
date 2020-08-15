import React from 'react';
import useError from '../../hooks/http-error-handler';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios, isLogin) => {
    return props => {
        const { error, errorConfirmedHandler } = useError(axios, isLogin);

        return (
            <React.Fragment>
                <Modal 
                show={error} modalClosed={errorConfirmedHandler}>
                {error ? error.message : null} </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        )
    } 
    
}

export default withErrorHandler;