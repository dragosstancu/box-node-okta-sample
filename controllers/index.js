/**
 * Load all controllers
 */
const express = require('express');
const router = express.Router();

const oidc = require('../service/okta/oktaMiddleware');
const BoxSdk = require('../service/box/boxSdk')
const BoxConfig = require('config').boxAppSettings

// load routes
router.use('/profile', oidc.ensureAuthenticated(), require('./profile'))

/**
 * base route
 */
router.get('/', function(req, res) {
  if (req.userinfo) {
    res.redirect('/profile');
  } else {
    res.render('pages/home');
  }
});

/**
 * callback from okta
 */
router.get('/callback', async function(req, res) {
  let externalId = req.userinfo.sub;
  let serviceAccountClient = BoxSdk.getAppAuthClient('enterprise', BoxConfig.enterpriseID);
  let appUser = await serviceAccountClient.users.get("", {external_app_user_id: externalId})

  // does app user already exist? if not, create one
  if(appUser.total_count > 0) {
    boxAppUserId = appUser.entries[0].id
  } else {
    let newAppUser = await serviceAccountClient.enterprise.addAppUser(req.userinfo.email, {external_app_user_id: externalId});
    boxAppUserId = newAppUser.id
  }
  req.userinfo.boxId = boxAppUserId

  res.redirect('/profile')
});

/**
 * logout clear session
 */
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
