import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {

    return (
        <React.Fragment>
            <Backdrop 
            show={props.show} 
            clicked={props.modalClosed}
            //renders null when show: false
            />
            <div className={classes.Modal} 
            style={{ //the modal is always rendered (but translated out of the page and invisible
                //when not in use)
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default React.memo(Modal, (prevProps, nextProps) => {
    return prevProps.show === nextProps.show && prevProps.children === nextProps.children;
});