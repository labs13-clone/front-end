import React from 'react';

const DifficultyLevels = (props) => {
  return (
    <div>        
        <select onChange={(e) => props.setDifficulty(e.target.value)}>
            <option value="1-100">All Difficulties</option>
            <option value="1-33">Easy</option>
            <option value="34-66">Medium</option>
            <option value="67-100">Hard</option>
        </select>
    </div>
  );
}

export default DifficultyLevels;