import React from 'react';
import ChallengesContainer from '../../Shared/ChallengesContainer/ChallengesContainer';
import UserInfo from './UserInfo';
import None from './None'
import './UserProfile.css';

const TabsView = (props) => {

    let propsToPass;
    let Banana;

    switch (props.tab) {
        case 'user-info':
            Banana = UserInfo;
            propsToPass = {
                auth: props.auth
            }
            break;
        default:
            if (props.challenges.length > 0) {
                Banana = ChallengesContainer;
                propsToPass = {
                    challenges: props.challenges,
                    auth: props.auth
                }
            } else {
                Banana = None;
                propsToPass = {
                    tab: props.tab,
                    auth: props.auth
                }
            }
    }

    return (
        <div className="tabs-view">
            <Banana {...propsToPass}/>
        </div>
    );
}

export default TabsView;
