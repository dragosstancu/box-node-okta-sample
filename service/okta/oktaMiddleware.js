const { ExpressOIDC } = require('@okta/oidc-middleware');

const oktaConfig = require('config').oktaConfig;

const oidc = new ExpressOIDC({
  issuer: `https://${oktaConfig.orgUrl}.com/oauth2/default`,
  client_id: oktaConfig.clientID,
  client_secret: oktaConfig.clientSecret,
  redirect_uri: oktaConfig.redirectUri,
  scope: 'openid profile email',
  routes: {
    callback: {
      defaultRedirect: "/callback"
    }
  }
});

module.exports = oidc;
