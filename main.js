var version = 'V1.2.0'
var async = require('async'), request = require('request');

var query = function(url, server, timeout, callback, success_fun, fail_fun) {
    request({url: url, headers: {'user-agent': 'blacklist-query '+version}, timeout: timeout},
    function(err, res, body) {
        if(!err && res.statusCode == 200) {
            success_fun(server, body, callback);
        } else {
            fail_fun(server, err, callback);
        }
    });
}

/* ip query start */
exports.ip = function(ip, timeout, callback) {
    query_ip(ip, timeout, callback);
}
exports.ip = function(ip, callback) {
    query_ip(ip, 3, callback);
}
function query_ip(ip, timeout, callback_fun) {
    if(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test(ip) == false) {
        callback_fun('not matching ip ruleset', null);
    }
    var servers = {
        'k-spam': 'https://kspam.swiftnode.cloud/mcbanip/community.php?ip='+ip,
        'mc-blacklist': 'https://api.mc-blacklist.kr/API/ip/'+ip
    }
    var funs = {
        'k-spam': {
            'success': function (body, callback) {
                switch(body) {
                    case 'true': callback(null, true); break;
                    case 'false': callback(null, false); break;
                    default: callback(null, 'error');
                }
            }, 'error': function(error, callback) {
                callback(null, 'fail');
            }
        }, 'mc-blacklist': {
            'success': function(body, callback) {
                body = JSON.parse(body);
                switch(body.blacklist) {
                    case true: callback(null, true); break;
                    case false: callback(null, false); break;
                    default: callback(null, body);
                }
            }, 'error': function(error, callback) {
                callback(null, 'fail');
            }
        }
    }
    async.mapValuesSeries(servers, function(url, server, callback) {
        query(url, server, timeout*1000, callback, function(server , body, callback) {funs[server].success(body, callback)},
        function(server, error, callback) {funs[server].error(error, callback)});
    }, function(err, res) {
        var result = {
            'timeout': timeout, 'query': ip,
            'response': res
        };
        callback_fun(err, result);
    });
}
/* ip query end */

/* uuid query start */
exports.uuid = function(uuid, timeout, callback) {
    query_uuid(uuid, timeout, callback);
}
exports.uuid = function(uuid, callback) {
    query_uuid(uuid, 3, callback);
}
function query_uuid(uuid, timeout, callback_fun) {
    if(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/.test(uuid) == false) {
        if(/[a-z0-9]{32}$/.test(uuid) == true) {
            uuid = uuid.substring(0,8)+'-'+uuid.substring(8,12)+'-'+
            uuid.substring(12,16)+'-'+uuid.substring(16,20)+'-'+uuid.substring(20,32);
        } else {
            callback_fun('not matching uuid ruleset', null);
        }
    }
    var servers = {
        'mc-blacklist': 'https://api.mc-blacklist.kr/API/uuid/'+uuid
    }
    var funs = {
        'mc-blacklist': {
            'success': function(body, callback) {
                body = JSON.parse(body);
                switch(body.blacklist) {
                    case true: callback(null, true); break;
                    case false: callback(null, false); break;
                    default: callback(null, body);
                }
            }, 'error': function(error, callback) {
                callback(null, 'fail');
            }
        }
    }
    async.mapValuesSeries(servers, function(url, server, callback) {
        query(url, server, timeout*1000, callback, function(server , body, callback) {funs[server].success(body, callback)},
        function(server, error, callback) {funs[server].error(error, callback)});
    }, function(err, res) {
        var result = {
            'timeout': timeout, 'query': uuid,
            'response': res
        };
        callback_fun(err, result);
    });
}
/* uuid query end */

/* nickname query start */
exports.nick = function(nick, timeout, callback) {
    query_nick(nick, timeout, callback);
}
exports.nick = function(nick, callback) {
    query_nick(nick, 3, callback);
}
exports.nickname = function(nick, timeout, callback) {
    query_nick(nick, timeout, callback);
}
exports.nickname = function(nick, callback) {
    query_nick(nick, 3, callback);
}
function query_nick(nick, timeout, callback_fun) {
    if(/[a-zA-Z0-9\_]{4,16}$/.test(nick) == false) {
        callback_fun('not matching nickname ruleset', null);
    }
    var servers = {
        'mc-blacklist': 'https://api.mc-blacklist.kr/API/nickname/'+nick
    }
    var funs = {
        'mc-blacklist': {
            'success': function(body, callback) {
                body = JSON.parse(body);
                switch(body.blacklist) {
                    case true: callback(null, true); break;
                    case false: callback(null, false); break;
                    default: callback(null, body);
                }
            }, 'error': function(error, callback) {
                callback(null, 'fail');
            }
        }
    }
    async.mapValuesSeries(servers, function(url, server, callback) {
        query(url, server, timeout*1000, callback, function(server , body, callback) {funs[server].success(body, callback)},
        function(server, error, callback) {funs[server].error(error, callback)});
    }, function(err, res) {
        var result = {
            'timeout': timeout, 'query': nick,
            'response': res
        };
        callback_fun(err, result);
    });
}
/* nickname query end */

/* nickname to uuid start */
exports.nickname_to_uuid = function(nick, timeout, callback) {
    nickname_to_uuid(nick, timeout, callback);
}
exports.nickname_to_uuid = function(nick, callback) {
    nickname_to_uuid(nick, 3, callback);
}
function nickname_to_uuid(nick, timeout, callback_fun) {
    if(/[a-zA-Z0-9\_]{4,16}$/.test(nick) == false) {
        callback_fun('not matching nickname ruleset', null);
    }
    require('request')({url: 'https://api.mojang.com/users/profiles/minecraft/'+nick, headers: {'user-agent': 'blacklist-query '+version}, timeout: timeout*1000},
    function(error, response, body) {
        if(!error && response.statusCode == 200) {
            return_data = JSON.parse(body);
            callback_fun(false, return_data.id);
        } else if(!error && response.statusCode == 204) {
            callback_fun(true, null);
        } else {
            callback_fun(true, body);
        }
    });
}
/* nickname to uuid end */