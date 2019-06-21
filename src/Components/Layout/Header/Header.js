import React from 'react';
import {Link} from 'react-router-dom';
import history from '../../../history';
import './Header.css';

const Header = (props) => {

    return (
        <nav className="header-wrapper">
            <div className="header">
                <div>
                    <Link className="logo" to="/">ChallengeJS</Link>
                    <Link className="navigation-link" to="/challenges">Challenges</Link>
                    <Link className="navigation-link" to="/leaderboard">Leaderboard</Link>
                    <Link className="navigation-link" to="/create-challenge">Add Challenge</Link>
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