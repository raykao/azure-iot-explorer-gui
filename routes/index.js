var express = require('express');
var router = express.Router();
var helpers = require('../helpers');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sessionFileBool = helpers.sessionExists();
  var sessionHasExpired = helpers.sessionHasExpired();
  var output = sessionHasExpired ? "does not exist" : "exists";
  var sessionTime = new Date(helpers.readSessionFile().expires);

  res.render('index', { 
    title: "IoT Hub Explorer Web GUI", 
    sessionHasExpired: sessionHasExpired, 
    output: output,
    sessionTime: sessionTime
  });
});

module.exports = router;
