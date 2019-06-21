import React from 'react';
import Loader from 'react-loader-spinner';

import './Loading.css';

export default function Loading() {
    return (
        <div className="loading-view">
            <Loader
                type="Oval"
                color="white"
                height="100"	
                width="100"
            />
        </div>
    )
}
