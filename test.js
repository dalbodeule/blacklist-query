var query = require('./main.js'), moment = require('moment'), timer = function(){}, waterfall = require('async/waterfall');
timer.prototype = {
    start: function() {
        this._time = moment(new Date().getTime());
    },
    end: function() {
        return moment(new Date().getTime()).diff(this._time);
    }
};

waterfall([
    function(callback) {
        var t = new timer;
        console.log('# testcase 1. ip query start');
        t.start();
        query.ip('127.0.0.1', function(err, res) {
            if(err) console.log(err);
            console.log(res);
            console.log('# end: '+t.end()+', testcase 1. ip query');
            callback(null);
        });
    },
    function(callback) {
        var t = new timer;
        console.log('# testcase 2. uuid query start');
        t.start();
        query.uuid('2e45712e3747428094cb1d39fe7ee434', function(err, res) {
            if(err) console.log(err);
            console.log(res);
            console.log('# end: '+t.end()+', testcase 2. uuid query');
            callback(null);
        });
    }, function(callback) {
        var t = new timer;
        console.log('# testcase 3. nickname query start');
        t.start();
        query.nick('trusty_people', function(err, res) {
            if(err) console.log(err);
            console.log(res);
            console.log('# end: '+t.end()+', testcase 3. nick query');
            callback(null);
        });
    }, function(callback) {
        var t = new timer;
        console.log('# testcase 4. nickname to uuid start');
        t.start();
        query.nickname_to_uuid('trusty_people', function(err, res) {
            if(err) console.log(err);
            console.log(res);
            console.log('# end: '+t.end()+', testcase 4. nickname to uuid');
            callback(null);
        });
    }
], function() {
    console.log('# test end!');
});
