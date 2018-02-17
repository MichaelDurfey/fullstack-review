import React from 'react';
import Tablerow from './Tablerow.jsx'

const RepoList = (props) => {
  return (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
      <table className = 'table'>
        <thead>
          <tr>
            <th>name</th>
            <th>login</th>
            <th>stars</th>
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