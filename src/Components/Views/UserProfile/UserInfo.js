import React from 'react';
import './UserProfile.css';

const UserInfo = (props) => {

    return (
        <div className="tabs-right-side user-info">
            <div className="user-info-username">{props.auth.user.nickname}</div>
            <div className="user-info-joined">Joined On {new Date(props.auth.user.created_at).toDateString()}</div>
            <div className="user-info-experience">
                {props.auth.user.xp} XP
            </div>
            <button className="button-pink btn-lg" onClick={_=>props.auth.logout()}>Logout</button>
        </div>
    );
}

export default UserInfo;