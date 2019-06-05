import React from 'react';

import UserInfoCard from '../UserView/UserInfoCard';
import TabsView from './Tabs';
import Header from '../Header/Header';


const UserView = () => {
  return (
    <div className="userview-wrapper">
        <Header />
        <UserInfoCard />
        <TabsView />
    </div>
  );
}

export default UserView;