import React from 'react'
import MultiSelect from "@khanacademy/react-multi-select";

export default function MetaForm(props) {

    return(
        <div className="meta-container">
            <h3>Basic Information</h3>
            <br/><br/>
            <form className="meta-form">
                <div>
                        <h4>Title</h4>
                    <br/>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '5px', background: 'white'}}>
                    <input 
                        name="title" 
                        className="challenge-info" 
                        value={props.title} 
                        onChange={props.handleTitleAndDifficultyChanges}
                    />
                        <div className="help-tip help-tip-dark">
                            <p>Provide title of the challenge here. For example: Return reversed string</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Difficulty</h4>
                    <br/>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '5px', background: 'white'}}>
                        <select 
                            name="difficulty" 
                            value={props.difficulty}
                            className="challenge-info" 
                            style={{width:200}} 
                            onChange={props.handleTitleAndDifficultyChanges}
                            >
                            <option>Select</option>
                            <option value="16">Easy</option>
                            <option value="50">Medium</option>
                            <option value="75">Hard</option>
                        </select>
                        <div className="help-tip help-tip-dark">
                            <p>Select level of difficulty of the challenge from the dropdown. It can be easy, medium or hard</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Categories</h4>
                    <br/>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '5px', background: 'white'}}>
                        <MultiSelect 
                            options={props.category} 
                            selected={props.selectedCategories} 
                            onSelectedChanged={props.setSelectedCategories}
                        />
                        <div className="help-tip help-tip-dark">
                            <p>Select category of the challenge from the dropdown. You can select multiple options.</p>
                        </div>
                    </div>
                </div>
            </form><br/>
        </div>
    )
}