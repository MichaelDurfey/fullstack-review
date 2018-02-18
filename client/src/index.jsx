import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      users: []
    }

  }
  
  // componentWillMount(){
  //   "Accept: application/vnd.heroku+json; version=3"
  //   $.get({
  //     url: '/',
  //     headers: {"Accept": "application/vnd.heroku+json; version=3"},
  //     success: function(data){
  //       console.log(data);
  //     }
  //   })
  // }

  componentDidMount() {
    this.get();
  }
  
  get(){
    let app = this;
    $.get({
      url: '/repos',
      headers: {"Content-Type": "application/json"},
      success: function(data){
        console.log(data);
        let users = data.map(repo => repo.login);
        app.setState({users: users});
        app.setState({repos: data});
      }
    })
  }
  
  dropData(){
    $.ajax({
      url: '/repos',
      headers: {"Content-Type": "application/json"},
      method: 'DELETE',
      success: function(){
      }
    }).done(() => this.get())
  }

  search (term) {
    console.log(`${term} was searched`);
    let data = {searchTerm: term};
    data = JSON.stringify(data);
    $.post({
      url: '/repos',
      headers: {"Content-Type": "application/json"},
      data: data
    }).done(()=> this.get())
  }

  render () {
    return (
    <div className ="main">
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <button onClick={() => this.dropData()}>Drop Data</button>
      <RepoList users={this.state.users}repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));