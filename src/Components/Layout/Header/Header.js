import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import history from '../../../history';
import './Header.css';

const Header = (props) => {

    return (
        <nav className="header-wrapper">
            <div className="header">
                <div>
                    <Link className="logo" to="/">ChallengeJS</Link>
                    <NavLink
                        className="navigation-link"
                        to="/challenges"
                        activeStyle={{
                        fontWeight: "bold",
                        color: "whitesmoke"
                    }}>Challenges</NavLink>
                    <NavLink
                        className="navigation-link"
                        to="/leaderboard"
                        activeStyle={{
                        fontWeight: "bold",
                        color: "whitesmoke"
                    }}>Leaderboard</NavLink>
                    <NavLink
                        className="navigation-link"
                        to="/create-challenge"
                        activeStyle={{
                        fontWeight: "bold",
                        color: "whitesmoke"
                    }}>Add Challenge</NavLink>
                </div>

                <button
                    className="account-button"
                    onClick={_ => history.replace('/profile')}
                    alt="user-dropdown">
                    Account
                </button>
            </div>
        </nav>
    );
}

export default Header;