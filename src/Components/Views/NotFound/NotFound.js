import React from 'react';
import { Link } from 'react-router-dom'

import './NotFound.css';

export default function NotFound() {
    return (
        <div className="notfound-wrapper">
            <h1 className="notfound-err">404</h1>
            <h3 className="notfound-heading">Sorry, this page isn't available.</h3>
            <h6 className="notfound-subheading">The link you followed may be broken, does not exist, or the page may have been removed. Go back to <Link className="notfound-link" to="/">ChallengeJS.</Link></h6>
        </div>
    )
}
