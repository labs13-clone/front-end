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
                        {/* <div className="help-tip">
                            <p>This is the inline help tip! It can contain all kinds of HTML. Style it as you please.</p>
                        </div> */}
                    <input 
                        name="title" 
                        className="challenge-info" 
                        value={props.title} 
                        onChange={props.handleTitleAndDifficultyChanges}
                    />
                    </div>
                </div>
                <div>
                    <h4>Difficulty</h4>
                    <br/>
                    <select 
                        name="difficulty" 
                        value={props.difficulty}
                        style={{'width': '50px'}} 
                        className="challenge-info" 
                        style={{width:200}} 
                        onChange={props.handleTitleAndDifficultyChanges}
                    >
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
            </form><br/>
            <div>
                <ul>
                    <li>Please provide title of the challenge in the title input field.</li><br/>
                    <li>Select level of difficulty of the challenge from the dropdown.</li><br/>
                    <li>Select category of the challenge from the dropdown. You can select multiple options.</li>
                </ul> 

            </div>
        </div>
    )
}