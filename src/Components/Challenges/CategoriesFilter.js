import React, { useState } from 'react';


const CategoriesFilter = () => {

  

  return (
    <div >
        <select>
            <option value="arrays">Arrays</option>
            <option value="conditions">Conditions</option>
            <option value="loops">Loops</option>
            <option value="math">Math</option>
            <option value="numbers">Numbers</option>
            <option value="objects">Objects</option>
            <option value="recursion">Recursion</option>
            <option value="regex">Regex</option>
            <option value="sorting">Sorting</option>
            <option value="strings">Strings</option>
        </select>
    </div>
  );
}

export default CategoriesFilter;