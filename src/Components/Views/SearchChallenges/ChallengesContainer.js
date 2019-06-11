import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ChallengeCard from '../../Shared/ChallengeCard/ChallengeCard';


const ChallengesContainer = (props) => {
 
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const token = props.auth.accessToken;
    console.log('rendered1');
    getData(token);
  }, []);

  async function getData (token) {
        try {
            const result = await axios({
                method: 'get', 
                url: `https://clone-coding-server.herokuapp.com/api/challenges`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
        });
        setChallenges(result.data);
        console.log(result.data)
            
        } catch (e) {
            console.log(e);
        }
  }

  return (
    <div >
        {challenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge}/>)}
    </div>
  );
}

export default ChallengesContainer;