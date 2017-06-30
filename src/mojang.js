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