import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import { listenForAuthChange } from './redux/actions';
import reducers from './redux/reducers';
import * as serviceWorker from './serviceWorker';
import { auth } from './config/firebaseApp';

import Navbar from './components/navigation/Navbar';
import Sidebar from './components/navigation/Sidebar';
import SignInPage from './pages/authentication/SignInPage';
import ForgotPasswordPage from './pages/authentication/ForgotPasswordPage';
import './index.css';
import './Form.css';

class App extends React.PureComponent {
  componentDidMount() {
    this.props.listenForAuthChange(this.props.history);
  }

  render() {
    return (
      <div id="App" className="not-print">
        {auth.currentUser && <Sidebar />}
        <div id="main_container">
          <Navbar />
          <main id="page">
            <Route path="/" exact component={SignInPage} />
            <Route path="/forgot-password" exact component={ForgotPasswordPage} />
          </main>
        </div>
      </div>
    );
  }
}

const ConnectedApp = connect(null, { listenForAuthChange })(App);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Route path="/" component={ConnectedApp} />
    </HashRouter>
  </Provider>,
  document.querySelector('#root')
);
serviceWorker.register();
