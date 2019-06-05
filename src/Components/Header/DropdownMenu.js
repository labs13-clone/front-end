import React, {useState, useEffect} from 'react';
import '../../Styles/Header.css';
import {Link} from 'react-router-dom';



const DropdownMenu = (props) => {

        // const [openDropdown, setOpenDropdown] = useState(false);

        // function toggleOpen(e) {
        //     e.preventDefault();
        //     setOpenDropdown(true);
        // }

    useEffect(() => console.log('value changed!'), [props.openDropdown]);

    return (
        <div className="container">
        <button type="button" className="button" onClick={(e) => props.toggleOpen(e)}>
            User
        </button>
        {props.openDropdown &&
            <div className="dropdown">
                <ul>
                    <Link className="option" to="/userprofile">Profile</Link>
                    <Link className="option" to="/">Logout</Link>
                </ul>
            </div>
        }

        </div>
    );
  }
  
  export default DropdownMenu;
