<<<<<<< HEAD
import React from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 30e08f5ebdbe19ab776d267858c9480a9190bf5e
import {Link} from 'react-router-dom';
import axios from 'axios';
import {difficultyToString} from '../../../Utility/difficultyToString';
import './ChallengeCard.css';

const ChallengeCard = (props) => {

    const categories = props.challenge.categories.map(cat => <button key={cat.id} className="category">{cat.name}</button>);

    //Button click handler that approves a challenge
    const approveChallenge = id => {

        //Update the challenge
        axios({
            method: 'put',
            url: `${process.env.REACT_APP_SERVER}/api/challenges`,
            headers: {
                Authorization: `Bearer ${props.auth.accessToken}`
            },
            data: {
                id: props.challenge.id,
                approved: 1
            }
        })
        .then(response => {
            props.challenge = response.data;
        })
        .catch(err => {
            console.log(err.message)
        });
    }

    //Only show the approve button if the challenge is not approved
    //AND only show it if the user is an admin
    const approveButton = (!props.challenge.approved && props.auth.user.role === 'admin') && <button onClick={approveChallenge(props.challenge.id)}>Approve Challenge</button>

    return (
        <Link to={`/challenges/${props.challenge.id}`}>
            <div className="challenge-wrapper">
                <div className="header-flex">
                    <h3>{props.challenge.title}</h3>
                    <h3>+</h3>
                </div>
                <p>
                    {props.challenge.description}
                </p>
                <div className="header-flex">
                    <div>
<<<<<<< HEAD
                        {categories}
                        {approveButton}
=======
                        <div className="category">{props.challenge.categories[0].name}</div>
>>>>>>> 30e08f5ebdbe19ab776d267858c9480a9190bf5e
                    </div>
                    <div>{difficultyToString(props.challenge.difficulty)}</div>
                </div>
            </div>
        </Link>
    );
}

export default ChallengeCard;