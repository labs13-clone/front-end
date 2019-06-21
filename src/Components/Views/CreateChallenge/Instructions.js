import React from 'react'


function instructions() {

    return(
        <div>
            <h2>Instructions for Creating a Challenge</h2>
            <p>This tab have the instructions for creating a challenge. Following are the instructions for each tab. Please read follow the instructions for creating the challenge:</p>
            <br/>
            <h4>Meta Tab</h4>
            <ul>
                <li>Please provide title of the challenge in the title input field.</li>
                <li>Select level of difficulty of the challenge from the dropdown.</li>
                <li>Select category of the challenge from the dropdown. You can select multiple options.</li>
            </ul> 
            <br/>
            <h4>Descriptions Tab</h4>
            <p>Provide description for the challenge. This description will tell users what they are expected to do in order to pass the challenge. You need to use mark-down for writing description.</p>
            <br/>
            <h4>Preview Tab</h4>
            <p>This tab is just to preview the description before. You can see how your description will appear to the users attempting this challenge.</p>
            <br/>
            <h4>Tests Tab</h4>
            <p>There are following three fields under this tab. In order to create the challenge, you need to provide at least one test. User's code will pass the challenge if it passes the test:</p>
            <ul>
                <li>Describe the test in a sentence. For example: "It should return a string"</li>
                <li>pass the arguments in the form of an array. For example: [1, 2, 3]</li>
                <li>Expected output from the function. For example: "Hello World"</li>
            </ul>
            <br/>
            <h4>Code Tab</h4>
            <p>Under this tab a JavaScript code editor is provided. Please write the solution to the challenge in this code editor.<br/><br/>Note: Please don't use arrow functions.</p>
        </div>
    )
}

export default instructions;