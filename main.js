'use strict';
let version = 'V1.3.5'
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

/**
 * 블랙리스트 검색 내용을 반환합니다.
 * @param {string} ip - 블랙리스트에 질의할 ip 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @param {function(Error, object):void} callback - 콜백 함수입니다. 첫번째 인자로 Error 가 반환되며, 두번째 인자로 정보가 반환됩니다.
 * @returns {void}
 */
exports.ip = (ip, timeout, callback) => {
    if(typeof timeout == 'number' && timeout > 0) {
        return query_ip(ip, timeout*1000, callback);
    } else {
        return query_ip(ip, 3*1000, callback);
    }
}
exports.ip = (ip, callback) => {
    return query_ip(ip, 3*1000, callback);
}

/**
 * 블랙리스트 검색 내용을 반환합니다.
 * @param {string} ip - 블랙리스트에 질의할 ip 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @return {Promise<Response>} - 응답 데이터가 넘어옵니다.
 */
exports.ip_pro = (ip, timeout) => {
    if(typeof timeout == 'number' && timeout > 0) {
        return new Promise((resolve, reject) => {
            query_ip(ip, timeout*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            query_ip(ip, 3*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }
}    
exports.ip_pro = (ip) => {
    return new Promise((resolve, reject) => {
        query_ip(ip, 3*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}

/**
 * 내부에서 처리용도로 만든 함수입니다.
 * @private
 * @param {string} ip - 질의할 ip입니다.
 * @param {number} timeout - timeout 입니다.
 * @param {function(Error, object)} callback_fun - 콜백 함수 입니다.
 */
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
            url: 'http://api.mc-blacklist.kr/API/ip/'+ip,
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

/**
 * 블랙리스트 검색 내용을 반환합니다.
 * @param {string} uuid - 블랙리스트에 질의할 uuid 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @param {function(Error, object):void} callback - 콜백 함수입니다. 첫번째 인자로 Error 가 반환되며, 두번째 인자로 정보가 반환됩니다.
 * @returns {void}
 */
exports.uuid = (uuid, timeout, callback) => {
    if(typeof timeout == 'number' && timeout > 0) {
        return query_uuid(uuid, timeout*1000, callback);
    } else {
        return query_uuid(uuid, 3*1000, callback);
    }
}
exports.uuid = (uuid, callback) => {
    return query_uuid(uuid, 3*1000, callback);
}

/**
 * 블랙리스트 검색 내용을 반환합니다.
 * @param {string} uuid - 블랙리스트에 질의할 uuid 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @return {Promise<Response>} - 응답 데이터가 넘어옵니다.
 */
exports.uuid_pro = (uuid, timeout) => {
    if(typeof timeout == 'number' && timeout > 0) {
        return new Promise((resolve, reject) => {
            query_uuid(uuid, timeout*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            query_uuid(uuid, 3*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }
}
exports.uuid_pro = (uuid) => {
    return new Promise((resolve, reject) => {
        query_uuid(uuid, 3*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}

/**
 * 내부에서 처리용도로 만든 함수입니다.
 * @private
 * @param {string} uuid - 질의할 uuid입니다.
 * @param {number} timeout - timeout 입니다.
 * @param {function(Error, object)} callback_fun - 콜백 함수 입니다.
 */
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
            url: 'http://api.mc-blacklist.kr/API/uuid/'+uuid,
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

/**
 * 블랙리스트 검색 내용을 반환합니다.
 * @param {string} nick - 블랙리스트에 질의할 닉네임 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @param {function(Error, object):void} callback - 콜백 함수입니다. 첫번째 인자로 Error 가 반환되며, 두번째 인자로 정보가 반환됩니다.
 * @returns {void}
 */
exports.nick = (nick, timeout, callback) => {
    if(typeof timeout == 'number' && timeout > 0) {
        query_nick(nick, timeout*1000, callback);
    } else {
        query_nick(nick, 3*1000, callback);
    }
}
exports.nick = (nick, callback) => {
    query_nick(nick, 3*1000, callback);
}
/**
 * 블랙리스트 검색 내용을 반환합니다.
 * @param {string} nick - 블랙리스트에 질의할 닉네임 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @param {function(Error, object):void} callback - 콜백 함수입니다. 첫번째 인자로 Error 가 반환되며, 두번째 인자로 정보가 반환됩니다.
 * @returns {void}
 */
exports.nickname = (nick, timeout, callback) => {
    if(typeof timeout == 'number' && timeout > 0) {
        query_nick(nick, timeout*1000, callback);
    } else {
        query_nick(nick, timeout*1000, callback);
    }
}
exports.nickname = (nick, callback) => {
    query_nick(nick, 3*1000, callback);
}

/**
 * 블랙리스트 검색 내용을 반환합니다.
 * @param {string} nick - 블랙리스트에 질의할 닉네임 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @return {Promise<Response>} - 응답 데이터가 넘어옵니다.
 */
exports.nick_pro = (nick, timeout) => {
    if(typeof timeout == 'number' && timeout > 0) {
        return new Promise((resolve, reject) => {
            query_nick(nick, timeout*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            query_nick(nick, 3*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }
}
exports.nick_pro = (nick) => {
    return new Promise((resolve, reject) => {
        query_nick(nick, 3*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}
/**
 * 블랙리스트 검색 내용을 반환합니다.
 * @param {string} nick - 블랙리스트에 질의할 닉네임 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @return {Promise<Response>} - 응답 데이터가 넘어옵니다.
 */
exports.nickname_pro = (nick, timeout) => {
    if(typeof timeout == 'number' && timeout > 0) {
        return new Promise((resolve, reject) => {
            query_nick(nick, timeout*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            query_nick(nick, 3*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }
}
exports.nickname_pro = (nick) => {
    return new Promise((resolve, reject) => {
        query_nick(nick, 3*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}

/**
 * 내부에서 처리용도로 만든 함수입니다.
 * @private
 * @param {string} nick - 질의할 닉네임입니다.
 * @param {number} timeout - timeout 입니다.
 * @param {function(Error, object)} callback_fun - 콜백 함수 입니다.
 */
function query_nick(nick, timeout, callback_fun) {
    if(/[a-zA-Z0-9\_]{4,16}$/.test(nick) == false) {
        callback_fun('not matching nickname ruleset', null);
    }
    let servers = {
        'mc-blacklist': {
            url: 'http://api.mc-blacklist.kr/API/nickname/'+nick,
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

/**
 * 모장 UUID API 검색 내용을 반환합니다.
 * @param {string} nick - 모장 API에 질의할 닉네임 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @param {function(Error, object):void} callback - 콜백 함수입니다. 첫번째 인자로 Error 가 반환되며, 두번째 인자로 정보가 반환됩니다.
 * @returns {void}
 */
exports.nickname_to_uuid = (nick, timeout, callback) => {
    if(typeof timeout == 'number' && timeout > 0) {
        nickname_to_uuid(nick, timeout*1000, callback);
    } else {
        nickname_to_uuid(nick, 3*1000, callback);
    }
}
exports.nickname_to_uuid = (nick, callback) => {
    nickname_to_uuid(nick, 3*1000, callback);
}

/**
 * 모장 UUID API 검색 내용을 반환합니다.
 * @param {string} nick - 모장 API에 질의할 닉네임 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @return {Promise<Response>} - 응답 데이터가 넘어옵니다.
 */
exports.nickname_to_uuid_pro = (nick, timeout) => {
    if(typeof timeout == 'number' && timeout > 0) {
        return new Promise((resolve, reject) => {
            nickname_to_uuid(nick, timeout*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            nickname_to_uuid(nick, 3*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }
}
exports.nickname_to_uuid_pro = (nick) => {
    return new Promise((resolve, reject) => {
        nickname_to_uuid(nick, 3*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}

/**
 * 내부에서 처리용도로 만든 함수입니다.
 * @private
 * @param {string} nick - 질의할 닉네임입니다.
 * @param {number} timeout - timeout 입니다.
 * @param {function(Error, object)} callback_fun - 콜백 함수 입니다.
 */
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