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
    <div className={banana}>
        <div className="rank-card__left">
            <h4>{props.index+1}</h4>
            <img className="rank-card__avatar" src={props.user.picture}/>
            <h4>{props.user.nickname}</h4> 
        </div>
        <div className="rank-card__right">
            {fontAwesome ? <FontAwesomeIcon icon="trophy" className={fontAwesomeClass}/> : ''}
            <h4>{props.user.xp}</h4>
        </div>
    </div>
    );
}

export default RankCard;