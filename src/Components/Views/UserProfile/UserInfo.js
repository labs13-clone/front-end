import React from 'react';
import './UserProfile.css';

const UserInfo = (props) => {

    return (
        <div className="tabs-right-side user-info">
            <h1 className="user-info-username">{props.auth.user.nickname}</h1>
            <h3 className="user-info-joined">Joined On {new Date(props.auth.user.created_at).toDateString()}</h3>
            <h2 className="user-info-experience">
                {props.auth.user.xp} XP
            </h2>
            <h2 className="user-info-role">Role: {props.auth.user.role}</h2>
            <button className="logout-button" onClick={_=>props.auth.logout()}>Logout</button>
        </div>
    );
}

export default UserInfo;