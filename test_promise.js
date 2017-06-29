'use strict';
let query = require('./main.js');

Promise.resolve()
    .then(() => {
        return new Promise((resolve, reject) => {
            console.time('t1');
            console.log('# testcase 1. ip query start');
            resolve();
        });
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            query.ip_pro('127.0.0.1')
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
        })
    })
    .then((result) => {
        console.log(result);
        console.timeEnd('t1');
        console.log('# testcase 1. ip query end');
    })
        .then(() => {
        return new Promise((resolve, reject) => {
            console.time('t2');
            console.log('# testcase 2. uuid query start');
            resolve();
        });
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            query.uuid_pro('069a79f4-44e9-4726-a5be-fca90e38aaf5')
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
        })
    })
    .then((result) => {
        console.log(result);
        console.timeEnd('t2');
        console.log('# testcase 2. uuid query end');
    })
        .then(() => {
        return new Promise((resolve, reject) => {
            console.time('t3');
            console.log('# testcase 3. nickname query start');
            resolve();
        });
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            query.nick_pro('Notch')
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
        })
    })
    .then((result) => {
        console.log(result);
        console.timeEnd('t3');
        console.log('# testcase 3. nickname query end');
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            console.time('t4');
            console.log('# testcase 4. nickname to uuid start');
            resolve();
        });
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            query.nickname_to_uuid_pro('Notch')
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
        })
    })
    .then((result) => {
        console.log(result);
        console.timeEnd('t4');
        console.log('# testcase 4. nickname to uuid end');
    })
    .catch((error) => {
        console.log(error);
    });