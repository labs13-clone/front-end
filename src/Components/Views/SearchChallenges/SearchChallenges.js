import React, { useState, useEffect } from 'react';
import CategoriesFilter from './CategoriesFilter';
import DifficultyLevels from './DifficultyLevels';
import ChallengesContainer from '../../Shared/ChallengesContainer/ChallengesContainer';

import axios from 'axios';

const SearchChallenges = (props) => {

   
  const [challenges, setChallenges] = useState([]);
  const [categories, setCategories] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const token = props.auth.accessToken;
    console.log('rendered1');
    getData(token);  
    getCategories(token);
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

  async function getCategories (token) {
        try {
          const result = await axios({
              method: 'get', 
              url: `https://clone-coding-server.herokuapp.com/api/categories`,
              headers: {
                  Authorization: `Bearer ${token}`
              }
        });
      setCategories(result.data);
          
      } catch (e) {
          console.log(e);
      }
  }

  function filterByDifficulty (level) {
      setDifficulty(level);
      
      
      let filtered;
      
        if(level === 'easy') {
          filtered = challenges.filter(challenge => challenge.difficulty >=1 && challenge.difficulty <=33);
        } else if (level === 'medium') {
          filtered = challenges.filter(challenge => challenge.difficulty >=34 && challenge.difficulty <=66);
        } else if(level === 'hard') {
          filtered = challenges.filter(challenge => challenge.difficulty >=67 && challenge.difficulty <=100);
        }

      //const filtered = challenges.filter(challenge => challenge.difficulty.toLowerCase() === level.toLowerCase());
      setFiltered(filtered); 
  }

  console.log(challenges);


  return (
    <div >
        <CategoriesFilter categories={categories}/>
        <DifficultyLevels filterByDifficulty={filterByDifficulty}/>
        <ChallengesContainer auth={props.auth} challenges={filtered}/>
    </div>
  );
}

export default SearchChallenges;