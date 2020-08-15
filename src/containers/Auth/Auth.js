import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../shared/utility';
import axios from '../../axios-auth';

const Auth = props => {

    const {building, authRedirectPath, onSetAuthRedirectPath } = props;

    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your email'
            },
            value: '', 
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            validationError: 'Please, name can not be letf empty'
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your password'
            },
            value: '', 
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            validationError: 'Password must be at least 6 characters long'
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (!building && authRedirectPath !== '/') {
            onSetAuthRedirectPath(); 
        }
    }, [building, authRedirectPath ,onSetAuthRedirectPath]);

    const inputChangedHandler = (event, inputIdentifier)  => {
        const updatedFormElement = updateObject(authForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, authForm[inputIdentifier].validation),
            touched: true
        })
        
        const updatedAuthForm = updateObject(authForm, {
            [inputIdentifier]:  updatedFormElement
        })
        let formIsValid = true;
        for (let inputElementIdentifier in updatedAuthForm) {
            formIsValid = updatedAuthForm[inputElementIdentifier].valid && formIsValid;
        }

        setAuthForm(updatedAuthForm);
        setFormIsValid(formIsValid)
    }

    const authHandler = (event) => {
        event.preventDefault();
        const email = authForm.email.value;
        const password = authForm.password.value;
        props.onAuth(email, password, isLogin, props.history);
    }

    const switchAuthMethodHandler = () => {
        setIsLogin(!isLogin);
    }

    const formElementsArray = []; 
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        })
    }
    let formElements = formElementsArray.map(element => {
        return (
            <Input 
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            changed={(event) => inputChangedHandler(event, element.id)}
            blured={(event) =>  inputChangedHandler(event, element.id)}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            validationError={element.config.validationError}/>
        )
    })
    
    if (props.loading) {
        formElements = <Spinner/>;
    }

    let authRedirect = null;
    if (props.isAuth) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.AuthData}>
            {authRedirect}
            {props.error? <p>{props.error}</p> : null}
            <h3>{isLogin? 'LOGIN' : 'SIGNUP'}</h3>
            <form onSubmit={authHandler}>
                {formElements}
                <Button btnType="Success" disabled={!formIsValid}>SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthMethodHandler}>SWITCH TO {isLogin? 'SIGN UP' : 'LOGIN'}</Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps  = (dispatch) => {
    return {
        onAuth: (email, password, isLogin, history) => dispatch(actions.auth(email,password, isLogin, history)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios, true));