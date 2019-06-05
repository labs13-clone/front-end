import React from 'react';

import UserInfoCard from '../UserView/UserInfoCard';
import TabsView from './Tabs';
import Header from '../Header/Header';


const UserView = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="userview-wrapper">
          <UserInfoCard />
          <TabsView />
      </div>
    </div>
  );
}

export default UserView;