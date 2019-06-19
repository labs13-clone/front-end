import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RankCard from './RankCard';

import './Leaderboard.css';

const Leaderboard = (props) => {

    const testArr = [1, 2, 3, 4, 5, 6, 7];
    const [users, setUsers] = useState([]);

    useEffect(() => {
        return getUsers();
    }, [])

    
    function getUsers() {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/users/all`,
            headers: {
                Authorization: `Bearer ${props.auth.accessToken}`
            }
        }).then(result => {
            const sorted = result.data.sort((a,b) => (a.xp > b.xp) ? -1 : ((b.xp > a.xp) ? 1 : 0)); 
            let rankedUsers = [];
            testArr.forEach((number, index) => {
                rankedUsers.push(sorted[index]);
                return rankedUsers;
            })
            setUsers(rankedUsers)
            console.log(rankedUsers);
        }).catch(e => {
            console.log(e);
        });
    }


    return (
        <div className="leaderboard-container">
            <div className="leaderboard-content">
                <div className="leaderboard-header">
                    <div className="stars-left">
                        <FontAwesomeIcon icon="star" className="star"/>
                        <FontAwesomeIcon icon="star" className="star star__middle"/>
                        <FontAwesomeIcon icon="star" className="star"/>
                    </div>

                    <h3>Leaderboard</h3>

                    <div className="stars-right">
                        <FontAwesomeIcon icon="star" className="star"/>
                        <FontAwesomeIcon icon="star" className="star star__middle"/>
                        <FontAwesomeIcon icon="star" className="star"/>
                    </div>
                </div>

                <div className="leaderboard-ranks">
                    {users.map((user, index) => <RankCard user={user} index={index}/>)}
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;