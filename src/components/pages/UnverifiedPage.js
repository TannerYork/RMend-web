import React from 'react';
import './UnverifedPage.css';

const UnverifiedPage = () => {
  return (
    <div className="unverifed-page">
      <div className="form-header" style={{ marginTop: 10 }}>
        <h1>Not Verified</h1>
        <p>
          <em>You needed to be verified by a moderator before you can access this web app</em>
        </p>
      </div>
    </div>
  );
};

export default UnverifiedPage;
