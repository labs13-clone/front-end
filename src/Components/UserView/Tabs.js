import React, { useState } from 'react';
import { Tabs, Tab} from 'react-bootstrap';


const TabsView = () => {

  const [tabKey, setTabKey] = useState('Completed');

  return (
    <div >
      <Tabs
        id="challenges-tab"
        activeKey={tabKey}
        onSelect={key => setTabKey(key)}
      >
        <Tab eventKey="Completed" title="Completed">
          
        </Tab>
        <Tab eventKey="Published" title="Published">
          
        </Tab>
        <Tab eventKey="Pending" title="Pending" disabled>
          
        </Tab>
      </Tabs>
    </div>
  );
}

export default TabsView;