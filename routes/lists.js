var express = require('express');
var router = express.Router();
var helpers = require('../helpers');
var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function(req, res, next) {    
    var iothubExplorerList = exec('iothub-explorer list --raw');
    var devices = [];
   
    iothubExplorerList.stdout.on('data', function (device) {
        devices.push(JSON.parse(device));
    }); 

    iothubExplorerList.on('exit', function (code) {
        console.log(devices);
        
        res.render('lists', { 
            title: "List Page",
            devices: devices
        });
    });
});

module.exports = router;
