import React from 'react';
import ChallengesContainer from '../../Shared/ChallengesContainer/ChallengesContainer';
import UserInfo from './UserInfo';
import None from './None'
import './UserProfile.css';

const TabsView = (props) => {

    let propsToPass;
    let CurrentComponent;

    switch (props.tab) {
        case 'user-info':
            CurrentComponent = UserInfo;
            propsToPass = {
                auth: props.auth
            }
            break;
        default:
            if (props.challenges.length > 0) {
                CurrentComponent = ChallengesContainer;
                propsToPass = {
                    challenges: props.challenges,
                    auth: props.auth
                }
            } else {
                CurrentComponent = None;
                propsToPass = {
                    tab: props.tab,
                    auth: props.auth
                }
            }
    }

    return (
        <div className="tabs-view">
            <CurrentComponent {...propsToPass}/>
        </div>
    );
}

export default TabsView;
