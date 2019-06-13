import React from 'react';

import UserInfoCard from './UserInfoCard';
import TabsView from './Tabs';

const UserProfile = (props) => {
  return (
    <div className="UserProfile-wrapper">
        <UserInfoCard auth={props.auth}/>
        <TabsView auth={props.auth}/>
    </div>
  );
}

export default UserProfile;