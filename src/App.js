import React from 'react';
import {
  HashRouter as Router, Route, Switch,
} from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import StadiumPage from './components/StadiumPage';

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/stadium/:stadiumId" component={StadiumPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
