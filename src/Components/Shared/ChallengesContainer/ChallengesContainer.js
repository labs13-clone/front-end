import React from 'react';

import ChallengeCard from '../ChallengeCard/ChallengeCard';


const ChallengesContainer = (props) => {
  console.log(props.challenges)
  return (
    <div >
        {props.challenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} auth={props.auth}/>)}
    </div>
  );
}

export default ChallengesContainer;