import React from 'react';
import Tablerow from './Tablerow.jsx'

const RepoList = (props) => {
  return (
  <div className ="repoList">
    There are {props.repos.length} repos.
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
  </div>
  )
}

export default RepoList;