import React, {useState, useEffect} from 'react';
import '../../Styles/Header.css';
import {Link} from 'react-router-dom';



const DropdownMenu = (props) => {


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
                    <p onClick={(e) => props.toggleClose(e)}>Close</p>
                </ul>
            </div>
        }

        </div>
    );
  }
  
  export default DropdownMenu;
