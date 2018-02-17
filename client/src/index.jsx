import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }
  
  componentWillMount(){
    this.get();
  }
  
  get(){
    let that = this;
    $.get({
      url: '/repos',
      headers: {"Content-Type": "application/json"},
      success: function(data){
        that.setState({repos: data});
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    let data = {searchTerm: term};
    data = JSON.stringify(data);
    $.post({
      url: '/repos',
      headers: {"Content-Type": "application/json"},
      data: data
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));