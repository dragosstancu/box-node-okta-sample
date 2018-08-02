## Prerequisites
[Okta](https://developer.okta.com/) authenticate/manage user identities

[Node.js (v9)](https://nodejs.org/en/)

## Instructions

Follow the steps below to get the app running on your local machine.

First, clone the repository and install dependencies.
```bash
$ git clone https://github.com/mattmitchell6/box-node-okta-sample.git
$ cd box-node-okta-sample
$ npm install
```

Create a new [Box application](https://developer.box.com/docs/configuring-service-accounts) and add the generated configuration variables (with generated private key) to the local.js file in the config folder (rename local.sample.js to local.js).

Add the domain, http://localhost:3000 to the list of "Allowed Origins" in the Box Developer Console.

#### Okta Configuration
...figure it out :)

Start the server.

```bash
$ npm start
```

Open a web browser and navigate to [http://localhost:3000/](http://127.0.0.1:3000/)
to see the example in action.
