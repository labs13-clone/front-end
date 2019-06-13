import React, { useState, useEffect } from 'react';
import CategoriesFilter from './CategoriesFilter';
import DifficultyLevels from './DifficultyLevels';
import ChallengesContainer from '../../Shared/ChallengesContainer/ChallengesContainer';

import axios from 'axios';

const SearchChallenges = (props) => {

   
  const [challenges, setChallenges] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('Strings');
  const [difficulty, setDifficulty] = useState('easy');

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const token = props.auth.accessToken;
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
        const defaultData = result.data.filter(challenge => {
          return challenge.difficulty >=1 && challenge.difficulty <=33 &&  challenge.categories[0].name === 'Strings'
        });
        console.log(defaultData);
        setFiltered(defaultData);
            
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
  
  function filterByCategory (newCategory) {
    setCategory(newCategory);
      
    let filtered;
    let filterByCategory;
    
      if(difficulty === 'easy') {
        filtered = challenges.filter(challenge => challenge.difficulty >=1 && challenge.difficulty <=33);
        filterByCategory = filtered.filter(challenge => challenge.categories[0].name === newCategory);
        console.log('category', category);
      } else if (difficulty === 'medium') {
        filtered = challenges.filter(challenge => challenge.difficulty >=34 && challenge.difficulty <=66);
        filterByCategory = filtered.filter(challenge => challenge.categories[0].name === newCategory);
      } else if(difficulty === 'hard') {
        filtered = challenges.filter(challenge => challenge.difficulty >=67 && challenge.difficulty <=100);
        filterByCategory = filtered.filter(challenge => challenge.categories[0].name === newCategory);
      }
    setFiltered(filterByCategory); 
  }

  function filterByDifficulty (level) {
      setDifficulty(level);
      
      let filtered;
      let filterByCategory;
      
        if(level === 'easy') {
          filtered = challenges.filter(challenge => challenge.difficulty >=1 && challenge.difficulty <=33);
          filterByCategory = filtered.filter(challenge => challenge.categories[0].name === category);
          console.log('category', category);
        } else if (level === 'medium') {
          filtered = challenges.filter(challenge => challenge.difficulty >=34 && challenge.difficulty <=66);
          filterByCategory = filtered.filter(challenge => challenge.categories[0].name === category);
        } else if(level === 'hard') {
          filtered = challenges.filter(challenge => challenge.difficulty >=67 && challenge.difficulty <=100);
          filterByCategory = filtered.filter(challenge => challenge.categories[0].name === category);
        }
      setFiltered(filterByCategory); 
  }

  console.log(category);


  return (
    <div >
        <CategoriesFilter categories={categories} filterByCategory={filterByCategory}/>
        <DifficultyLevels filterByDifficulty={filterByDifficulty} />
        <ChallengesContainer auth={props.auth} challenges={filtered}/>
    </div>
  );
}

export default SearchChallenges;