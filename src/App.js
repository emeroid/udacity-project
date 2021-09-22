import React from 'react'
import './App.css';
import SearchPage from './SearchPage';
import HomePage from './HomePage';

import { Route, BrowserRouter, Switch } from 'react-router-dom';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <BrowserRouter>
           <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/search" component={SearchPage}/>
           </Switch>
        </BrowserRouter>
      </div>
      
    )
  }
}

export default BooksApp
