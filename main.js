'use strict';
let version = 'V1.3.1'
let async = require('async'), request = require('request');

let query = (url, timeout, callback, success_fun, fail_fun) => {
    request({url: url, headers: {'user-agent': 'blacklist-query '+version}, timeout: timeout},
    (err, res, body) => {
        if(!err && res.statusCode == 200) {
            success_fun(body, callback);
        } else {
            let result = {
                status: 'fail', error: err
            };
            callback(null, result);
        }
    });
}

/* ip query start */
exports.ip = (ip, timeout, callback) => {
    query_ip(ip, timeout*1000, callback);
}
exports.ip = (ip, callback) => {
    query_ip(ip, 3*1000, callback);
}
exports.ip_pro = (ip, timeout, callback) => {
    return new Promise((resolve, reject) => {
        query_ip(ip, timeout*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}
exports.ip_pro = (ip, callback) => {
    return new Promise((resolve, reject) => {
        query_ip(ip, 3*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}
function query_ip(ip, timeout, callback_fun) {
    if(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test(ip) == false) {
        callback_fun('not matching ip ruleset', null);
    }
    let servers = {
        /*'k-spam': {
            url: 'https://kspam.swiftnode.cloud/mcbanip/community.php?ip='+ip,
            success: (body, callback) => {
                let result = {
                    status: false
                };
                switch(body) {
                    case 'true': result.status = true; break;
                    case 'false':  result.status = false; break;
                    default: result.status = 'error'; break;
                }
                if(result.status == 'error') {
                    result.error = body;
                }
                callback(null, result);
            }
        },*/
        'mc-blacklist': {
            url: 'https://mc-blacklist.kr/API/ip/'+ip,
            success: (body, callback) => {
                let res = JSON.parse(body)['blacklist'];
                let result = {
                    status: false
                };
                switch(res) {
                    case true: result.status = true; break;
                    case false:  result.status = false; break;
                    default: result.status = 'error'; break;
                }
                if(result.status == 'error') {
                    result.error = body;
                }
                callback(null, result);
            }
        }
    }
    async.mapValues(servers, (value, server, callback) => {
        query(value.url, timeout, callback, value.success, value.error);
    }, (err, res) => {
        let result = {
            'timeout': timeout, 'query': ip,
            'response': res
        };
        callback_fun(err, result);
    });
}
/* ip query end */

/* uuid query start */
exports.uuid = (uuid, timeout, callback) => {
    query_uuid(uuid, timeout*1000, callback);
}
exports.uuid = (uuid, callback) => {
    query_uuid(uuid, 3*1000, callback);
}
exports.uuid_pro = (uuid, timeout, callback) => {
    return new Promise((resolve, reject) => {
        query_uuid(uuid, timeout*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}
exports.uuid_pro = (uuid, callback) => {
    return new Promise((resolve, reject) => {
        query_uuid(uuid, 3*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
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
    let servers = {
        'mc-blacklist': {
            url: 'https://mc-blacklist.kr/API/uuid/'+uuid,
            success: (body, callback) => {
                let res = JSON.parse(body)['blacklist'];
                let result = {
                    status: false
                };
                switch(res) {
                    case true: result.status = true; break;
                    case false:  result.status = false; break;
                    default: result.status = 'error'; break;
                }
                if(result.status == 'error') {
                    result.error = body;
                }
                callback(null, result);
            }
        }
    }
    async.mapValues(servers, (value, server, callback) => {
        query(value.url, timeout, callback, value.success, value.error);
    }, (err, res) => {
        let result = {
            'timeout': timeout, 'query': uuid,
            'response': res
        };
        callback_fun(err, result);
    });
}
/* uuid query end */

/* nickname query start */
exports.nick = (nick, timeout, callback) => {
    query_nick(nick, timeout*1000, callback);
}
exports.nick = (nick, callback) => {
    query_nick(nick, 3*1000, callback);
}
exports.nickname = (nick, timeout, callback) => {
    query_nick(nick, timeout*1000, callback);
}
exports.nickname = (nick, callback) => {
    query_nick(nick, 3*1000, callback);
}
exports.nick_pro = (nick, timeout, callback) => {
    return new Promise((resolve, reject) => {
        query_nick(nick, timeout*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}
exports.nick_pro = (nick, callback) => {
    return new Promise((resolve, reject) => {
        query_nick(nick, 3*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}
exports.nickname_pro = (nick, timeout, callback) => {
    return new Promise((resolve, reject) => {
        query_nick(nick, timeout*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}
exports.nickname_pro = (nick, callback) => {
    return new Promise((resolve, reject) => {
        query_nick(nick, 3*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}
function query_nick(nick, timeout, callback_fun) {
    if(/[a-zA-Z0-9\_]{4,16}$/.test(nick) == false) {
        callback_fun('not matching nickname ruleset', null);
    }
    let servers = {
        'mc-blacklist': {
            url: 'https://mc-blacklist.kr/API/nickname/'+nick,
            success: (body, callback) => {
                let res = JSON.parse(body)['blacklist'];
                let result = {
                    status: false
                };
                switch(res) {
                    case true: result.status = true; break;
                    case false:  result.status = false; break;
                    default: result.status = 'error'; break;
                }
                if(result.status == 'error') {
                    result.error = body;
                }
                callback(null, result);
            }
        }
    }
    async.mapValues(servers, (value, server, callback) => {
        query(value.url, timeout, callback, value.success, value.error);
    }, (err, res) => {
        let result = {
            'timeout': timeout, 'query': nick,
            'response': res
        };
        callback_fun(err, result);
    });
}
/* nickname query end */

/* nickname to uuid start */
exports.nickname_to_uuid = (nick, timeout, callback) => {
    nickname_to_uuid(nick, timeout*1000, callback);
}
exports.nickname_to_uuid = (nick, callback) => {
    nickname_to_uuid(nick, 3*1000, callback);
}
exports.nickname_to_uuid_pro = (nick, timeout, callback) => {
    return new Promise((resolve, reject) => {
        nickname_to_uuid(nick, timeout*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}
exports.nickname_to_uuid_pro = (nick,  callback) => {
    return new Promise((resolve, reject) => {
        nickname_to_uuid(nick, 3*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}
function nickname_to_uuid(nick, timeout, callback_fun) {
    if(/[a-zA-Z0-9\_]{4,16}$/.test(nick) == false) {
        callback_fun('not matching nickname ruleset', null);
    }
    require('request')({url: 'https://api.mojang.com/users/profiles/minecraft/'+nick,
    headers: {'user-agent': 'blacklist-query '+version}, timeout: timeout},
    (error, response, body) => {
        if(!error && response.statusCode == 200) {
            let ret = JSON.parse(body);
            let result = {
                'timeout': timeout, 'query': nick,
                'response': ret['id'].substring(0,8)+'-'+ret['id'].substring(8,12)+'-'+
            ret['id'].substring(12,16)+'-'+ret['id'].substring(16,20)+'-'+ret['id'].substring(20,32), 'result': 'success'
            };
            callback_fun(false, result);
        } else if(!error && response.statusCode == 204) {
            let result = {
                'timeout': timeout, 'query': nick,
                'result': 'fail'
            };
            callback_fun(false, result);
        } else {
            let result = {
                'timeout': timeout, 'query': nick,
                'response': body, 'result': 'error'
            };
            callback_fun(false, result);
        }
    });
}
/* nickname to uuid end */