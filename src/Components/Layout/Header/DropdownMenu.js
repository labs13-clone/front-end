import React, {useState, useEffect} from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const DropdownMenu = (props) => {

    // const [anchorEl, setAnchorEl] = React.useState(null);

    // function handleClick(event) {
    //   setAnchorEl(event.currentTarget);
    // }
  
    // function handleClose() {
    //   setAnchorEl(null);
    // }


    // const ProfileButton = withStyles(theme => ({
    //     root: {
    //         padding:"0px",
    //         color: "pink",
    //         backgroundColor: "white",
    //         '&:hover': {
    //             backgroundColor: "grey",
    //       },
    //     },
    //   }))(Button);
      

    useEffect(() => console.log('value changed!'), [props.openDropdown]);

    const logout = () => props.auth.logout();

    return (
        <div className="container">

        {/* <ProfileButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Open Menu
        </ProfileButton>
        <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu> */}

        <button type="button" className="button" onClick={(e) => props.toggleOpen(e)}>
            User
        </button>

        {props.openDropdown &&
            <div className="dropdown">
                <ul>
                    <Link className="option" to="/userprofile">Profile</Link>
                    <button className="option" onClick={logout}>Logout</button>
                    <p onClick={(e) => props.toggleClose(e)}>Close</p>
                </ul>
            </div>
        }

        </div>
    );
  }
  
  export default DropdownMenu;
