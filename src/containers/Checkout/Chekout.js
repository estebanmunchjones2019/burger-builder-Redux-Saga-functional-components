import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


const Checkout = props => {
   
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/"/> //Redirected by default
    if (props.ings) { //got ingredients?
        const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null; 
        //did you press order button? go ahead? not? go to '/'
        summary = (
            <React.Fragment>
                {purchasedRedirect}
                <CheckoutSummary
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}
                ingredients={props.ings}/>
                <Route 
                path={props.match.path + '/contact-data'} 
                component={ContactData} />
            </React.Fragment>
        )
    }
    return summary
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);