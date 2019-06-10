import React, { useState } from 'react';
import CategoriesFilter from './CategoriesFilter';
import DifficultyLevels from './DifficultyLevels';

const SearchChallenges = () => {
  return (
    <div >
        <CategoriesFilter />
        <DifficultyLevels />
    </div>
  );
}

export default SearchChallenges;