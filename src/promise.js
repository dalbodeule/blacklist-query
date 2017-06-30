"use strict";
/**
 * 블랙리스트 검색 내용을 반환합니다.
 * @param {string} ip - 블랙리스트에 질의할 ip 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @return {Promise<Response>} - 응답 데이터가 넘어옵니다.
 */
exports.ip = (ip, timeout) => {
    if(typeof timeout == 'number' && timeout > 0) {
        return new Promise((resolve, reject) => {
            require('./ip.js')(ip, timeout*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            require('./ip.js')(ip, 3*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }
}    
exports.ip = (ip) => {
    return new Promise((resolve, reject) => {
        require('./ip.js')(ip, 3*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}

/**
 * 블랙리스트 검색 내용을 반환합니다.
 * @param {string} uuid - 블랙리스트에 질의할 uuid 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @return {Promise<Response>} - 응답 데이터가 넘어옵니다.
 */
exports.uuid = (uuid, timeout) => {
    if(typeof timeout == 'number' && timeout > 0) {
        return new Promise((resolve, reject) => {
            require('./uuid.js')(uuid, timeout*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            require('./uuid.js')(uuid, 3*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }
}
exports.uuid = (uuid) => {
    return new Promise((resolve, reject) => {
        require('./uuid.js')(uuid, 3*1000, (err, res) => {
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
exports.nick = (nick, timeout) => {
    if(typeof timeout == 'number' && timeout > 0) {
        return new Promise((resolve, reject) => {
            require('./nick.js')(nick, timeout*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            require('./nick.js')(nick, 3*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }
}
exports.nick = (nick) => {
    return new Promise((resolve, reject) => {
        require('./nick.js')(nick, 3*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}

/**
 * 모장 UUID API 검색 내용을 반환합니다.
 * @param {string} nick - 모장 API에 질의할 닉네임 입니다.
 * @param {number} [timeout=3] - timeout 로 지정할 시간입니다. 단위는 초 입니다. 지정하지 않으면 자동으로 3초로 설정됩니다.
 * @return {Promise<Response>} - 응답 데이터가 넘어옵니다.
 */
exports.n2u = (nick, timeout) => {
    if(typeof timeout == 'number' && timeout > 0) {
        return new Promise((resolve, reject) => {
            require('./mojang.js')(nick, timeout*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            require('./mojang.js')(nick, 3*1000, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }
}
exports.n2u = (nick) => {
    return new Promise((resolve, reject) => {
        require('./mojang.js')(nick, 3*1000, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}