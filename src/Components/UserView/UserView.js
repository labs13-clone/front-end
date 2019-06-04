import React from 'react';

import UserInfoCard from '../UserView/UserInfoCard';
import TabsView from './Tabs';


const UserView = () => {
  return (
    <div className="userview-wrapper">
        <UserInfoCard />
        <TabsView />
    </div>
  );
}

export default UserView;