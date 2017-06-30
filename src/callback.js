"use strict";
/**
 * 블랙리스트 검색 내용을 반환합니다.
 * @param {string} ip - 블랙리스트에 질의할 ip 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @param {function(Error, object):void} callback - 콜백 함수입니다. 첫번째 인자로 Error 가 반환되며, 두번째 인자로 정보가 반환됩니다.
 * @returns {void}
 */
exports.ip = (ip, timeout, callback) => {
    if(typeof timeout == 'number' && timeout > 0) {
        return require('./ip.js')(ip, timeout*1000, callback);
    } else {
        return require('./ip.js')(ip, 3*1000, callback);
    }
}
exports.ip = (ip, callback) => {
    return require('./ip.js')(ip, 3*1000, callback);
}

/**
 * 블랙리스트 검색 내용을 반환합니다.
 * @param {string} uuid - 블랙리스트에 질의할 uuid 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @param {function(Error, object):void} callback - 콜백 함수입니다. 첫번째 인자로 Error 가 반환되며, 두번째 인자로 정보가 반환됩니다.
 * @returns {void}
 */
exports.uuid = (uuid, timeout, callback) => {
    if(typeof timeout == 'number' && timeout > 0) {
        return require('./uuid.js')(uuid, timeout*1000, callback);
    } else {
        return require('./uuid.js')(uuid, 3*1000, callback);
    }
}
exports.uuid = (uuid, callback) => {
    return require('./uuid.js')(uuid, 3*1000, callback);
}

/**
 * 블랙리스트 검색 내용을 반환합니다.
 * @param {string} nick - 블랙리스트에 질의할 닉네임 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @param {function(Error, object):void} callback - 콜백 함수입니다. 첫번째 인자로 Error 가 반환되며, 두번째 인자로 정보가 반환됩니다.
 * @returns {void}
 */
exports.nick = (nick, timeout, callback) => {
    if(typeof timeout == 'number' && timeout > 0) {
        require('./nick.js')(nick, timeout*1000, callback);
    } else {
        require('./nick.js')(nick, 3*1000, callback);
    }
}
exports.nick = (nick, callback) => {
    require('./nick.js')(nick, 3*1000, callback);
}

/**
 * 모장 UUID API 검색 내용을 반환합니다.
 * @param {string} nick - 모장 API에 질의할 닉네임 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @param {function(Error, object):void} callback - 콜백 함수입니다. 첫번째 인자로 Error 가 반환되며, 두번째 인자로 정보가 반환됩니다.
 * @returns {void}
 */
exports.n2u = (nick, timeout, callback) => {
    if(typeof timeout == 'number' && timeout > 0) {
        require('./mojang.js')(nick, timeout*1000, callback);
    } else {
        require('./mojang.js')(nick, 3*1000, callback);
    }
}
exports.n2u = (nick, callback) => {
    require('./mojang.js')(nick, 3*1000, callback);
}