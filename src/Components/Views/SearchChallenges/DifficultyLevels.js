import React from 'react';
import './SearchChallenges.css';

const DifficultyLevels = (props) => {
    return (
        <select
            onChange={(e) => props.setDifficulty(e.target.value)}
            className="filter"
        >
            <option value="1-100">All Difficulties</option>
            <option value="1-33">Easy</option>
            <option value="34-66">Medium</option>
            <option value="67-100">Hard</option>
        </select>
    );
}

export default DifficultyLevels;