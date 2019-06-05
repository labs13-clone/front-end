import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import '../../Styles/Header.css';


const Header = () => {

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
            <div>
                <Link to="/">Home</Link>
                <Link to="/challenges">Challenges</Link>
            </div>
            <div>
                <Link to="/new/challenge">+ Add Challenge</Link>
                <DropdownMenu openDropdown={openDropdown} toggleOpen={toggleOpen} toggleClose={toggleClose}/>
            </div>  
        </div> 
    </nav>
  );
}

export default Header;