"use strict";
/**
 * 내부에서 처리용도로 만든 함수입니다.
 * @private
 * @param {string} nick - 질의할 닉네임입니다.
 * @param {number} timeout - timeout 입니다.
 * @param {function(Error, object)} callback_fun - 콜백 함수 입니다.
 */
module.exports = (nick, timeout, callback_fun) => {
    let query = require('./modules'), async = require('async');
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
};