import React from 'react';

import UserInfoCard from './UserInfoCard';
import TabsView from './Tabs';

const UserProfile = () => {
  return (
    <div className="UserProfile-wrapper">
        <UserInfoCard />
        <TabsView />
    </div>
  );
}

export default UserProfile;