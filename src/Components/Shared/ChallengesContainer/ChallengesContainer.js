import React from 'react';

import ChallengeCard from '../ChallengeCard/ChallengeCard';


const ChallengesContainer = (props) => {


  return (
    <div >
        {props.challenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge}/>)}
    </div>
  );
}

export default ChallengesContainer;