"use strict";
/** 내부에서 ip 질의를 처리하는 함수입니다.
 * @private
 * @param {string} ip - 질의할 ip를 입력합니다.
 * @param {number} timeout - timeout 로 설정할 시간입니다. 단위는 ms 입니다.
 * @param {function(Error, string):void} callback_fun - 콜백 함수입니다. 첫번째 인자로 Error 가 반환되며, 두번째 인자로 정보가 반환됩니다.
 * @returns {void}
 */
module.exports = (ip, timeout, callback_fun) => {
    let query = require('./modules'), async = require('async');
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
        query(value.url, timeout, callback, value.success);
    }, (err, res) => {
        let result = {
            'timeout': timeout, 'query': ip,
            'response': res
        };
        callback_fun(err, result);
    });
};