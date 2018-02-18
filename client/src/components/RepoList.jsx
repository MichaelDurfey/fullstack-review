import React from 'react';
import Tablerow from './Tablerow.jsx';
import UserTable from './UserTable.jsx';

const RepoList = (props) => {
  let users = props.users.reduce( (acc, curr) => {
    if (!acc[curr]) {
      acc[curr] = true;
    }
    return acc;
  }, {});
  Object.keys(users)
  console.log(users);
  return (
  <div className ="repoList">
    There are {props.repos.length} repos and {
      Object.keys(users).length
    } users.
      <table className = 'table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>User</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
        {
          props.repos.map( item => <Tablerow repo={item} />)
        }
        </tbody>
      </table>
      <table className = 'users'>
        <thead>
          <tr>
            <th>Users</th>
          </tr>
        </thead>
        <tbody>
        {
          Object.keys(users).map( user => <UserTable user={user} />)
        }
        </tbody>
      </table>
  </div>
  )
}

export default RepoList;