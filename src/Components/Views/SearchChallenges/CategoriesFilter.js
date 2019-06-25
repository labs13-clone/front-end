import React from 'react';
import './SearchChallenges.css';

const CategoriesFilter = (props) => {

    return (
        <div className="select-dropdown">

        <select className="custom-select"
            onChange={(e) => props.setCategory(e.target.value === "null" ? null : Number(e.target.value))}
            
        >
            <option value={false}>All Categories</option>
            {props
                .categories
                .map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>

        </div>
    );
}

export default CategoriesFilter;