import React, { useState, useEffect } from 'react';
import CategoriesFilter from './CategoriesFilter';
import DifficultyLevels from './DifficultyLevels';
import ChallengesContainer from './ChallengesContainer';

import axios from 'axios';

const SearchChallenges = (props) => {

   
  const [challenges, setChallenges] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');

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

  function filterByDifficulty (level) {
      setDifficulty(level);
  }

  console.log('props', props)
  return (
    <div >
        <CategoriesFilter />
        <DifficultyLevels filterByDifficulty={filterByDifficulty}/>
        <ChallengesContainer auth={props.auth} challenges={challenges}/>
    </div>
  );
}

export default SearchChallenges;