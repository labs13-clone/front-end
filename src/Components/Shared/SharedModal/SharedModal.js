import React from 'react';
import Modal from '@material-ui/core/Modal';
import "./SharedModal.css"


const SharedModal = props => {
    return(
    <Modal  onClick={props.modalCallback} open={props.modalState} children={
        <div  className="attempt-challenge-modal" onClick={props.modalCallback}>
            <h4>{props.message}</h4>
        </div>}
    />
    )
}

export default SharedModal;


