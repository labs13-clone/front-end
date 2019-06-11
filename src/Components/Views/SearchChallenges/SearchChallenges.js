import React, { useState, useEffect } from 'react';
import CategoriesFilter from './CategoriesFilter';
import DifficultyLevels from './DifficultyLevels';
import ChallengesContainer from '../../Shared/ChallengesContainer/ChallengesContainer';

import axios from 'axios';

const SearchChallenges = (props) => {

   
  const [challenges, setChallenges] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');

  const [filtered, setFiltered] = useState([]);

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
        setFiltered(result.data);
            
        } catch (e) {
            console.log(e);
        }
  }

  function filterByDifficulty (level) {
      setDifficulty(level); 
      const filtered = challenges.filter(challenge => challenge.difficulty.toLowerCase() === level.toLowerCase());
      setFiltered(filtered); 
  }


  console.log('props', props)
  return (
    <div >
        <CategoriesFilter />
        <DifficultyLevels filterByDifficulty={filterByDifficulty}/>
        <ChallengesContainer auth={props.auth} challenges={filtered}/>
    </div>
  );
}

export default SearchChallenges;