import React from 'react'

function Tab(props) {

  function onClick() {
    props.onClick(props.label);
  }

    return (
      <li className={props.activeTab === props.label ? 'tab-list-item tab-list-active' : 'tab-list-item'} onClick={onClick}>
        {props.label}
      </li>
    );
}

export default Tab;