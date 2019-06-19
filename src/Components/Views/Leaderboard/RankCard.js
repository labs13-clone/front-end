import React, {useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Leaderboard.css';

const RankCard = (props) => {

    let banana;
    let fontAwesome;
    let fontAwesomeClass;

    switch(props.index) {
        case 0:
            banana = 'first-place'
            fontAwesome = true;
            fontAwesomeClass = 'first-cup';
            break;
        case 1: 
            banana = 'second-place';
            fontAwesome = true;
            fontAwesomeClass = 'second-cup';
            break;
        case 2: 
            banana = 'third-place';
            fontAwesome = true;
            fontAwesomeClass = 'third-cup';
            break;
        default:
            banana = "rank-card";
    }


    return (
    <div className={banana}><h4>{props.user.nickname}</h4> {fontAwesome ? <FontAwesomeIcon icon="trophy" className={fontAwesomeClass}/> : ''}</div>
    );
}

export default RankCard;