import React from 'react';

const UserTable = (props) => (
  <tr>
    <a href ={props.user}><td>{props.user}</td></a>
  </tr>
)

export default UserTable;