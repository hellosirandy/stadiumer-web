import React from 'react';
import NavBar from './components/NavBar';
import StadiumCard from './components/StadiumCard';

class App extends React.PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <>
        <NavBar />
        <StadiumCard />
      </>
    );
  }
}

export default App;
