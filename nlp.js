var apiai = require('apiai');

var app = apiai("53a41ac0606c41e9b50883aefc052643");

var request = app.textRequest('make a transaction', {
    sessionId: '968885892282'
});

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();

