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
            break;
        case 1: 
            banana = 'second-place';
            fontAwesome = true;
            break;
        case 2: 
            banana = 'third-place';
            fontAwesome = true;
            break;
        default:
            banana = "rank-card";
    }


    return (
    <div className={banana}>Card 1 {fontAwesome ? <FontAwesomeIcon icon="star" /> : ''}</div>
    );
}

export default RankCard;