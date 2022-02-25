import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { position: 'sticky', bottom: '0', paddingTop: '20px', height: '85px' };
  return (
    <footer>
      <div style={divStyle} className="ui center aligned fluid container">
        <p> ©2021-2022 VolunteerAlly. All rights reserved.
          <a href="https://volunteerally.org/privacy-policy"> Privacy Policy. </a>
          <a href="https://volunteerally.org/terms-conditions">Terms and Conditions.</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
