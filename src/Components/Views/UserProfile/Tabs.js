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
        const filter = {};

        //Toggle the endpoint and filters Depending on which tab is being shown
        switch (tab) {

            case "started":

                filter.started = 1;
                break;

            case "completed":

                filter.completed = 1;
                break;

            case "created":

                filter.approved = 1;
                filter.created_by = props.auth.user.id;

                //If the user is not an admin Then only return their challenges
                if (props.auth.user.role !== 'admin') {
                    filter.created_by = props.auth.user.id;
                }

                break;

            case "unapproved":

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
            url: `${process.env.REACT_APP_SERVER}/api/challenges${objToQuery(filter)}`,
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

            {tab === 'started' && <ChallengesContainer challenges={challenges} auth={props.auth}/>}
            {tab === 'completed' && <ChallengesContainer challenges={challenges} auth={props.auth}/>}
            {tab === 'created' && <ChallengesContainer challenges={challenges} auth={props.auth}/>}
            {tab === 'unapproved' && <ChallengesContainer challenges={challenges} auth={props.auth}/>}

        </div>
    );
}

export default TabsView;
