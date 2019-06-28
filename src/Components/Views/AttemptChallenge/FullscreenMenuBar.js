import React, { useState, useEffect } from 'react';
import './AttemptChallenge.css';
import "./FullscreenMenuBar.css"
import Pulse from "./PulseTest";
import {Menu as MenuIcon,Clear} from "@material-ui/icons";

const MenuBar = (props) => {
    const [clicked,setClicked] = useState(false);

    function handleClick(){
        setClicked(!clicked)
    }

        return (
        <div className={(props.isFull ? "fullscreen-action-bar" : "action-bar" )}>
            <Pulse pulse={props.pulse} counter={props.testCounter} completed={props.completed} passed={props.passed}/>

            <div className="menu-wrapper">

                <div className="menu-item-wrapper">
                    {
                        !clicked ? null :
                        <>
                            <button className="item-style" onClick={props.resetChallenge}>Reset Challenge</button>
                            <button className={(props.completed ? "item-style-disabled" : "item-style")} disabled={props.completed} onClick={() => {handleClick();props.runTests();}}>Run Tests</button>
                            <button className={(!props.passed || props.completed ? "item-style-disabled" : "item-style")} disabled={!props.passed || props.completed} onClick={() => {handleClick();props.submitChallenge();}}>{"Submit Solution"}</button> 
                        </>
                    }
                </div>
                {
                    clicked ?   <Clear onClick={handleClick} style={{fontSize:"36", "cursor":"pointer"}}/> 
                                        :
                                <MenuIcon onClick={handleClick} style={{fontSize:"36", "cursor":"pointer"}}/>
                }
                    
            </div>
        </div>
    )
}
export default MenuBar;