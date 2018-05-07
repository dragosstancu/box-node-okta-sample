/**
 *  Create Box node sdk object
 */
const fs = require('fs');
const path = require('path');

const BoxSdk = require('box-node-sdk');
const BoxConfig = require('config').boxAppSettings;

// Set up the Box SDK
module.exports = new BoxSdk({
	clientID: BoxConfig.clientID,
	clientSecret: BoxConfig.clientSecret,
	appAuth: {
		keyID: BoxConfig.appAuth.publicKeyID,
		privateKey: BoxConfig.appAuth.privateKey ? BoxConfig.appAuth.privateKey : process.env.PRIVATE_KEY,
		passphrase: BoxConfig.appAuth.passphrase
	}
});
