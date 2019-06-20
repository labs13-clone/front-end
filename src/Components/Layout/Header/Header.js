import React from 'react';
import {Link} from 'react-router-dom';
import history from '../../../history';
import './Header.css';

const Header = (props) => {
<<<<<<< Updated upstream
=======
    console.log(props.auth.user)
    
    const [openDropdown, setOpenDropdown] = useState(false);
>>>>>>> Stashed changes

    return (
        <nav className="header">
            <div className="header__wrapper">
                <div className="link-wrapper">
                    <div className="left-header">
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

            </div>
        </nav>
    );
}

export default Header;