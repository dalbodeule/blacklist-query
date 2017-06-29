let query = require('./main.js'), waterfall = require('async/waterfall');

waterfall([
    function(callback) {
        console.time('t1');
        console.log('# testcase 1. ip query start');
        query.ip('127.0.0.1', function(err, res) {
            if(err) console.log(err);
            console.log(res);
            console.timeEnd('t1');
            console.log('# testcase 1. ip query end');
            callback(null);
        });
    },
    function(callback) {
        console.time('t2');
        console.log('# testcase 2. uuid query start');
        query.uuid('069a79f4-44e9-4726-a5be-fca90e38aaf5', function(err, res) {
            if(err) console.log(err);
            console.log(res);
            console.timeEnd('t2');
            console.log('# testcase 2. uuid query end');
            callback(null);
        });
    }, function(callback) {
        console.time('t3');
        console.log('# testcase 3. nickname query start');
        query.nick('Notch', function(err, res) {
            if(err) console.log(err);
            console.log(res);
            console.timeEnd('t3');
            console.log('# testcase 3. nick query end');
            callback(null);
        });
    }, function(callback) {
        console.time('t4');
        console.log('# testcase 4. nickname to uuid start');
        query.nickname_to_uuid('Notch', function(err, res) {
            if(err) console.log(err);
            console.log(res);
            console.timeEnd('t4');
            console.log('# testcase 4. nickname to uuid end');
            callback(null);
        });
    }
], function() {
    console.log('# test end!');
});
