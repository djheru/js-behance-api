import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingAnimation from './components/LoadingAnimation';
import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar'

const HomePage = Loadable({
  loader: () => import('./pages/HomePage'),
  loading: LoadingAnimation
});

const ProfilePage = Loadable({
  loader: () => import('./pages/ProfilePage'),
  loading: LoadingAnimation
});

const NotFound = Loadable({
  loader: () => import('./pages/NotFound'),
  loading: LoadingAnimation
});

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Switch>
          <Route path="/" component={HomePage} exact/>
        </Switch>
        <Route path={"/(.+)"} render={() => (
          <div>
            <NavBar/>
            <Container className="main">
              <Switch>
                <Route path="/profile/:username" component={ProfilePage}/>
                <Route component={NotFound}/>
              </Switch>
            </Container>
          </div>
        )}/>
      </div>
      </Router>
    );
  }
}

export default App;
