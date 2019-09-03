import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="no-print">
      <div className="about">
        <div className="about__wrapper">
          <div className="about__header">
            <div className="about__rule-before" />
            <img className="about__logo" src="images/BCFull.png" alt="BC Roads" />
            <div className="about__rule-after" />
          </div>

          <div className="about__content">
            <p className="about__description">
              <em>R.Mend</em> is a web app for keeping up with local road issues. If you would like
              to get this setup for your organization contact skills@barren.kyschools.us
            </p>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer__copyright">
          <div className="footer__item">
            <button>
              <span className="footer__copyright-symbol">©</span> 2019 Tanner York, All rights
              reserved.
            </button>
          </div>
        </div>

        <div className="footer__links">
          <div className="footer__item footer__item--auto">
            <a href="mailto: skills@barren.kyschools.us">Contact</a>
          </div>

          <div className="footer__item download-btn">
            <button className="diabled">Download</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
