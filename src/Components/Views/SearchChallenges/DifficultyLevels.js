import React, { useState } from 'react';
import jssPluginPropsSort from 'jss-plugin-props-sort';

const DifficultyLevels = (props) => {

  return (
    <div >
        <select onChange={(e) => props.filterByDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
    </div>
  );
}

export default DifficultyLevels;