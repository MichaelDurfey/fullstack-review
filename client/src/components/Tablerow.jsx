import React from 'react';

const Tablerow = ({repo}) => (
  <tr>
    <a href ={repo.url}><td>{repo.name}</td></a>
    <td>{repo.login}</td>
    <td>{repo.stars}</td>
  </tr>
)

export default Tablerow;