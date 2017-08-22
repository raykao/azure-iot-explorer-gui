var path = require('path');
var fs = require('fs');
var configLoc = require('iothub-explorer/common.js').configLoc;
var loc = configLoc();
var sessionFilePath = path.join(loc.dir, loc.file);  

function sessionExists() {
    if (fs.existsSync(sessionFilePath)) {
        return true;
    }
    else {
        return false;
    }
 }
  
function readSessionFile() {
    if(sessionExists()){
        var sessionFile = fs.readFileSync(sessionFilePath).toString();
        var SharedAccessSignature = require('azure-iot-device'). SharedAccessSignature;
        var sas = SharedAccessSignature.parse(sessionFile);
        var expiryTime = new Date(0).setUTCSeconds(sas.se);
        
        return {
            service_resource: sas.sr,
            signature: sas.sig,
            expires: expiryTime
        };
    }
    else {
        return {
            service_resource: null,
            signature: null,
            expires: null
        }
    }
}

function sessionHasExpired(){
    if(sessionExists()){
        var dateNow = new Date();
        return readSessionFile().expires > dateNow ? false : true;
    }
    else {
        return false;
    }
}

module.exports = {
    readSessionFile: readSessionFile,
    sessionExists: sessionExists,
    sessionHasExpired: sessionHasExpired
};