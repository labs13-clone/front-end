import React from 'react';
import MultiSelect from "@khanacademy/react-multi-select";



function CategoryDropDown(props) {

  return(
    <MultiSelect
        options={props.options}
        selected={props.selectedCategories}
        onSelectedChanged={selected => props.setSelectedCategories(selected)}
      />
  ) 
}

export default CategoryDropDown;