import React, { useState } from 'react';
import CategoriesFilter from './CategoriesFilter';
import DifficultyLevels from './DifficultyLevels';
import ChallengesContainer from './ChallengesContainer';

const SearchChallenges = (props) => {

  console.log('props', props)
  return (
    <div >
        <CategoriesFilter />
        <DifficultyLevels />
        <ChallengesContainer auth={props.auth}/>
    </div>
  );
}

export default SearchChallenges;