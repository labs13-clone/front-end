import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ChallengesContainer from '../../Shared/ChallengesContainer/ChallengesContainer';
import {objToQuery} from '../../../Utility/objToQuery';

const TabsView = (props) => {

    const [tab,
        setTab] = useState('completed');
    const [challenges,
        setChallenges] = useState([]);
    const token = props.auth.accessToken;

    useEffect(() => {

        //Create empty endpoint string and filter object
        let endpoint = '';
        const filter = {};

        //Toggle the endpoint and filters Depending on which tab is being shown
        switch (tab) {
            case "started":

                endpoint = 'submissions';
                filter.completed = 0;
                filter.created_by = props.auth.user.id;
                break;

            case "completed":

                endpoint = 'submissions';
                filter.completed = 1;
                filter.created_by = props.auth.user.id;
                break;

            case "created":

                endpoint = 'challenges';
                filter.approved = 1;

                //If the user is not an admin Then only return their challenges
                if (props.auth.user.role !== 'admin') {
                    filter.created_by = props.auth.user.id;
                }

                break;

            case "unapproved":

                endpoint = 'challenges';
                filter.approved = 0;

                //If the user is not an admin Then only return their challenges
                if (props.auth.user.role !== 'admin') {
                    filter.created_by = props.auth.user.id;
                }

                break;

            default:
                break;
        }

        //Request the challenges or submissions from the api
        axios({
            method: 'get',
            url: `https://clone-coding-server.herokuapp.com/api/${endpoint}${objToQuery(filter)}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setChallenges(response.data);
        })
        .catch(err => {
            console.log(err.message)
        });

    }, [tab]);

    //Toggle the current tab
    const toggleTab = (event) => {
        setTab(event.target.id);
    }

    return (
        <div>
            <div className="tabs-wrapper">
                <p id="started" className="tab-btn" onClick={toggleTab}>Started Challenges</p>
            </div>

            <div className="tabs-wrapper">
                <p id="completed" className="tab-btn" onClick={toggleTab}>Completed Challenges</p>
            </div>

            <div className="tabs-wrapper">
                <p id="created" className="tab-btn" onClick={toggleTab}>Created Challenges</p>
            </div>

            <div className="tabs-wrapper">
                <p id="unapproved" className="tab-btn" onClick={toggleTab}>Unapproved Challenges</p>
            </div>

            {tab === 'started' && <ChallengesContainer challenges={challenges}/>}
            {tab === 'completed' && <ChallengesContainer challenges={challenges}/>}
            {tab === 'created' && <ChallengesContainer challenges={challenges}/>}
            {tab === 'unapproved' && <ChallengesContainer challenges={challenges}/>}

        </div>
    );
}

export default TabsView;
