import React from 'react'
import MultiSelect from "@khanacademy/react-multi-select";

export default function Meta(props) {
    return(
        <div className="meta-container">
            <h3>Basic Information</h3>
            <br/><br/>
            <form className="meta-form">
                <div>
                    <h4>Title</h4>
                    <br/>
                    <input className="challenge-info" value={props.title} onChange={props.handleTitleChanges}/>
                </div>
                <div>
                    <h4>Difficulty</h4>
                    <br/>
                    <select style={{'width': '50px'}} className="challenge-info" style={{width:200}} onChange={props.handleDifficultyChanges}>
                        <option>Select</option>
                        <option value="16">Easy</option>
                        <option value="50">Medium</option>
                        <option value="75">Hard</option>
                    </select>
                </div>
                <div>
                    <h4>Categories</h4>
                    <br/>
                    <MultiSelect 
                        options={props.category} 
                        selected={props.selectedCategories} 
                        onSelectedChanged={props.setSelectedCategories}
                    />
                </div>
            </form>
        </div>
    )
}