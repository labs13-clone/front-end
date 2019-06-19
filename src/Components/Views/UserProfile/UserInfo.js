import React from 'react';
import './UserProfile.css';

const UserInfo = (props) => {
    return (
        <div className="tabs-right-side">
            <h1>{props.auth.user.nickname}</h1>
            <h3>Joined On {new Date(props.auth.user.created_at).toDateString()}</h3>
            <h2>
                {props.auth.user.xp} XP
            </h2>
            <h2>Role: {props.auth.user.role}</h2>
        </div>
    );
}

export default UserInfo;