# Start the Proxy for UI Server

Make sure you have nodejs installed in Windows OS you're trying to run the service on.

### Install Dependencies by
`npm i hermes_proxy-1.0.0.tgz`

### Start the service by running
`pm2 start ecosystem.config.js`

### Stop the service by running
`pm2 stop proxy-server-ngaio2d`

### Delete the service by running
`pm2 delete proxy-server-ngaio2d`
