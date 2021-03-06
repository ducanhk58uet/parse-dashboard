var express = require('express');
var ParseDashboard = require('parse-dashboard');

var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "https://139.162.52.76:442/parse",
            "appId": "snapsofts123",
            "masterKey": "123456",
            "appName": "dashboard"
        }
    ],
    "users": [
        {
            "user":"admin",
            "pass":"123456"
        }
    ],
    "useEncryptedPasswords": false
});

var app = express();

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(4040);