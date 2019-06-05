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

  return (
    <nav>  
        <div>
            <Link to="/"></Link>
            <Link to="/challenges">Challenges</Link>
        </div>
        <div>
            <Link to="/new/challenge">+ Add Challenge</Link>
            <DropdownMenu openDropdown={openDropdown} toggleOpen={toggleOpen}/>
        </div>
    </nav>
  );
}

export default Header;