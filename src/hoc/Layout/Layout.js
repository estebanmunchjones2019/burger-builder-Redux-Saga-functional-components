import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import * as actions from '../../store/actions/index';

const Layout = (props) => {//this component could be placed in the container folder
    
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () =>{
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <React.Fragment>
                <Toolbar 
                isAuth={props.isAuth}
                drawerToggleClicked={sideDrawerToggleHandler}/>
                <SideDrawer 
                isAuth={props.isAuth}
                open={showSideDrawer} 
                closed={sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
