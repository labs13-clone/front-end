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
            <h4 className="rank-card__column1">{props.index+1}</h4>
            <img className="rank-card__avatar rank-card__column2" src={props.user.picture}/>
            <h4 className="rank-card__column3">{props.user.nickname}</h4> 
        </div>
        <div className="rank-card__right">
            <h4 className="rank-card__column5">{props.user.xp}</h4>
            {fontAwesome ? <div className="rank-card__column4"><FontAwesomeIcon icon="trophy" className={fontAwesomeClass}/></div>: <div className="rank-card__column4"></div>}
        </div>
    </div>
    );
}

export default RankCard;