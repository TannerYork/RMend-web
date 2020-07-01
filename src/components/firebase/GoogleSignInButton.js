import React from 'react';
import { withRouter } from 'react-router-dom';
import { GoogleAuthId, auth } from '../../config/firebaseApp';

var firebaseui = require('firebaseui');

class GoogleSignInButton extends React.Component {
  componentDidMount() {
    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [{ provider: GoogleAuthId, prompt: 'select_account' }]
    };

    if (firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance();
      ui.start('#google-sign-in-button', uiConfig);
    } else {
      const ui = new firebaseui.auth.AuthUI(auth);
      ui.start('#google-sign-in-button', uiConfig);
    }
  }

  render() {
    return <div id="google-sign-in-button" />;
  }
}

export default withRouter(GoogleSignInButton);
