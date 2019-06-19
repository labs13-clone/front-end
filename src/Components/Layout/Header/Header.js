import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import './Header.css';


const Header = (props) => {
    
    const [openDropdown, setOpenDropdown] = useState(false);

    function toggleOpen(e) {
        e.preventDefault();
        setOpenDropdown(true);
    }

    function toggleClose(e) {
        e.preventDefault();
        setOpenDropdown(false);
    }

  return (
    <nav className="header"> 
       <div className="header__wrapper">
            <div className="link-wrapper">
                <Link className="logo" to="/">ChallengeJS</Link>
                <Link className="challenge-link" to="/challenges">Challenges</Link>
            </div>
            <div className="link-wrapper">
                <Link className="challenge-link" to="/create-challenge">+ Add Challenge</Link>
                <DropdownMenu {...props} openDropdown={openDropdown} toggleOpen={toggleOpen} toggleClose={toggleClose}/>
            </div>  
        </div> 
    </nav>
  );
}

export default Header;