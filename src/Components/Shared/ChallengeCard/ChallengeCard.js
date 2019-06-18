import React from 'react';
import history from '../../../history';
import axios from 'axios';
import {difficultyToString} from '../../../Utility/difficultyToString';
import ReactMarkdown from 'react-markdown';
import './ChallengeCard.css';

const ChallengeCard = (props) => {

    const categories = props.challenge.categories.map(cat => <button key={cat.id} className="pill-button">{cat.name}</button>);

    //Button click handler that approves a challenge
    const approveChallenge = _ => {

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
    console.log(props)
    const approveButton = (!props.challenge.approved && props.auth.user && props.auth.user.role === 'admin') && <button onClick={approveChallenge}>Approve Challenge</button>
    return (
        <div onClick={_ => history.replace(`/challenges/${props.challenge.id}`)} className="challenge-wrapper">

                <div className="card-body">
                    <h1 className="challenge-title" >{props.challenge.title}</h1>
                </div>
                <p>
                    <ReactMarkdown source={props.challenge.description}/>
                </p>
                <div className="card-footer">
                    <div>
                        {categories}
                        {approveButton}
                    </div>
                    <div className="pill-button" >{difficultyToString(props.challenge.difficulty)}</div>
                </div>
        </div>
    );
}

export default ChallengeCard;