import React from 'react';
import './UserProfile.css';

export default function SideBar(props) {
    return (
        <div className="sidebar">
            <img
                alt="avatar"
                className="sidebar-avatar"
                src={props.auth.user.picture}/>
            <h2>{props.auth.user.nickname}</h2>
            <div>Chillaxin since {new Date(props.auth.user.created_at).toDateString()}</div>
            <h2>
                {props.auth.user.xp} XP
            </h2>
            <div className="sidebar-tabs">
                <div
                    id="user-info"
                    className={props.tab === 'user-info'
                    ? 'sidebar-tab sidebar-tab-active'
                    : 'sidebar-tab sidebar-tab-inactive'}
                    onClick={props.toggleTab}>User Info</div>
                <div
                    id="started"
                    className={props.tab === 'started'
                    ? 'sidebar-tab sidebar-tab-active'
                    : 'sidebar-tab sidebar-tab-inactive'}
                    onClick={props.toggleTab}>Started Challenges</div>
                <div
                    id="completed"
                    className={props.tab === 'completed'
                    ? 'sidebar-tab sidebar-tab-active'
                    : 'sidebar-tab sidebar-tab-inactive'}
                    onClick={props.toggleTab}>Completed Challenges</div>
                <div
                    id="created"
                    className={props.tab === 'created'
                    ? 'sidebar-tab sidebar-tab-active'
                    : 'sidebar-tab sidebar-tab-inactive'}
                    onClick={props.toggleTab}>Created Challenges</div>
                <div
                    id="unapproved"
                    className={props.tab === 'unapproved'
                    ? 'sidebar-tab sidebar-tab-active'
                    : 'sidebar-tab sidebar-tab-inactive'}
                    onClick={props.toggleTab}>Unapproved Challenges</div>
            </div>
        </div>
    )
}
