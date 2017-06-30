"use strict";
let request = require('request'), async = require('async');
/**
 * 내부에서 질의를 위한 함수입니다.
 * @private
 * @param {string} url - 질의할 URL입니다.
 * @param {number} timeout - timeout 로 설정할 시간입니다. 단위는 ms 입니다.
 * @param {function(Error, object):void} callback - 콜백 함수입니다. 첫번째 인자로 Error 가 반환되며, 두번째 인자로 정보가 반환됩니다.
 * @param {function(string, object):void} success_fun - 콜백 함수입니다. 성공했을 경우 작동하며, body 내용과 callback 인자가 전달됩니다.
 */
module.exports = (url, timeout, callback, success_fun) => {
    request({url: url, headers: {'user-agent': 'blacklist-query '+global.version}, timeout: timeout},
    (err, res, body) => {
        if(!err && res.statusCode == 200) {
            success_fun(body, callback);
        } else {
            let result = {
                status: 'fail', error: err, body
            };
            callback(null, result);
        }
    });
};
