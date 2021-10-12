const React = require('react');
const ThirdPartyJS = require('@smallstep/internal').ThirdPartyJS;

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <ThirdPartyJS
      clymPropertyId={process.env.GATSBY_CLYM_PROPERTY_ID}
      intercomAppId={process.env.GATSBY_INTERCOM_APP_ID}
    />,
  ]);
};
