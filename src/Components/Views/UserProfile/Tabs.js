import React, { useState } from 'react';
import ChallengeCard from '../../Shared/ChallengeCard/ChallengeCard';

const TabsView = () => {

  const [completed, setCompleted] = useState(true);
  const [published, setPublished] = useState(false);
  const [pending, setPending] = useState(false);

  function showPublished() {
     setPublished(true);
     setCompleted(false);
     setPending(false);
  }

  function showCompleted() {
    setCompleted(true);
    setPublished(false);
    setPending(false);
 }

 function showPending() {
    setPending(true);
    setCompleted(false);
    setPublished(false);
 }

  return (
    <div >
        <div className="tabs-wrapper">
            <p className="tab-btn" onClick={showCompleted}>Completed</p>
        </div>

        <div className="tabs-wrapper">
            <p className="tab-btn" onClick={showPublished}>Published</p>
        </div>
 
        <div className="tabs-wrapper">
            <p className="tab-btn" onClick={showPending}>Pending</p>
        </div>
            {completed ? <p>Completed challenges go here</p> : null}
            {published ? <p>Published challenges go here</p> : null}
            {pending ? <p>Pending challenges go here</p> : null}

    </div>
  );
}

export default TabsView;




