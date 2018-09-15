import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql'
});

const rootElement = document.getElementById('root');

let render = () => {
  ReactDOM.render((
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ApolloProvider>
  ), rootElement);
};

// Enable HMR
if(module.hot) {
  module.hot.accept('./App', () => {
    setTimeout(render);
  });
}

render();
registerServiceWorker();
