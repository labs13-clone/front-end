import React from 'react';


const CategoriesFilter = (props) => {

  //Todo: Get category names from API

  return (
    <div >
        <select onChange={(e) => props.filterByCategory(e.target.value)}>
            {props.categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
        </select>
    </div>
  );
}

export default CategoriesFilter;