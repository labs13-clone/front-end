import React, {useState} from 'react';

const TabsView = () => {

    const [tab,
        setTab] = useState('completed');

    const toggleTab = (event) => {
        setTab(event.target.id);
    }

    return (
        <div>
            <div className="tabs-wrapper">
                <p id="started" className="tab-btn" onClick={toggleTab}>Started Challenges</p>
            </div>

            <div className="tabs-wrapper">
                <p id="completed" className="tab-btn" onClick={toggleTab}>Completed Challenges</p>
            </div>

            <div className="tabs-wrapper">
                <p id="created" className="tab-btn" onClick={toggleTab}>Created Challenges</p>
            </div>

            <div className="tabs-wrapper">
                <p id="unapproved" className="tab-btn" onClick={toggleTab}>Unapproved Challenges</p>
            </div>

            {tab === 'started' && <p>Started challenges go here</p>}
            {tab === 'completed' && <p>Completed challenges go here</p>}
            {tab === 'created' && <p>Created challenges go here</p>}
            {tab === 'unapproved' && <p>Unapproved challenges go here</p>}

        </div>
    );
}

export default TabsView;
