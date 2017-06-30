"use strict";
global.version = 'V2.0.1';
module.exports = {
    /**
     * callback 함수들이 모여있습니다.
     */
    callback: require('./src/callback'),
    /**
     * promise 함수들이 모여있습니다.
     */
    promise: require('./src/promise')
};