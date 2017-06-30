"use strict";
/**
 * 내부에서 처리용도로 만든 함수입니다.
 * @private
 * @param {string} uuid - 질의할 uuid입니다.
 * @param {number} timeout - timeout 입니다.
 * @param {function(Error, object)} callback_fun - 콜백 함수 입니다.
 */
module.exports = (uuid, timeout, callback_fun) => {
    let query = require('./modules'), async = require('async');
    if(/^(?:[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}|[a-z0-9]{32})$/.test(uuid) == false) {
        callback_fun('not matching uuid ruleset', null);
    } else {
        uuid = uuid.replace(/\-/g, '');
        uuid = uuid.substring(0,8)+'-'+uuid.substring(8,12)+'-'+
            uuid.substring(12,16)+'-'+uuid.substring(16,20)+'-'+uuid.substring(20,32);
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
                        default: 
                            result.status = 'error';
                            result.error = body;
                            break;
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
};