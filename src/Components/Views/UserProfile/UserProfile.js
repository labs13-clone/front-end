import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {objToQuery} from '../../../Utility/objToQuery';
import TabsView from './TabsView';
import SideBar from './SideBar';
import './UserProfile.css';

const UserProfile = (props) => {
    const [tab,
        setTab] = useState('user-info');
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
        }).then(response => {
            setChallenges(response.data);
            
        }).catch(err => {
            console.log(err.message)
        });

    }, [tab]);

    //Toggle the current tab
    const toggleTab = (event) => {
        setTab(event.target.id);
    }

    return (
      <div className="user-profile">
        { 
            props.auth.user !== undefined &&
                (<React.Fragment>
                    <SideBar auth={props.auth} toggleTab={toggleTab} tab={tab}/>
                    <TabsView auth={props.auth} tab={tab} challenges={challenges}/>
                </React.Fragment>)
        }
      </div>
    );
}

export default UserProfile;