var express = require('express');
var ParseDashboard = require('parse-dashboard');

var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:1337/parse",
            "appId": "snapsofts123",
            "masterKey": "123456",
            "appName": "dashboard"
        }
    ]
});

var app = express();

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(4040);