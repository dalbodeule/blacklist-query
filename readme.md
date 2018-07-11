# blacklist-query

[![Build Status](https://travis-ci.org/small-sunshines/blacklist-query.svg?branch=master)](https://travis-ci.org/small-sunshines/blacklist-query) [![npm version](https://badge.fury.io/js/blacklist-query.svg)](https://badge.fury.io/js/blacklist-query)

역할: 마인크래프트 유저의 UUID나 ip가 차단되어있나 확인합니다.

## 차단되어 있는지 확인 하는 곳
~~[K-Spam](http://cafe.naver.com/kspam) - IP를 검색합니다.~~
K-Spam 은 미작동하여 주석처리 되었습니다.

[MC-Blacklist](https://mc-blacklist.kr/) - IP, UUID, Nickname 를 검색합니다.

## 라이선스
MIT

## 의존성 패키지
1. async (2.1.4)
2. request (2.79.1)
4. node.js (6.9.2 이상)

## 모듈 로드

```javascript
let query = require('blacklist-query');
```
## callback 방식

`blacklist-query` Object 안의 `callback` Object를 호출하여 사용이 가능합니다.

### 모든 함수 공통

#### 공통 인자

`timeout` 인자는 선택 인자 입니다. 만약 입력할 경우 timeout 이 지정됩니다.

`timeout` 인자를 입력하지 않을 경우 기본 3초로 timeout 이 지정됩니다.

만약 1 으로 지정할 경우, 1초 이내에 응답이 없을 경우 실패로 간주합니다.

`callback` 인자는 콜백 처리 함수를 입력합니다.

#### 반환 형태

`status`가 `true` 일 경우 블랙리스트에 등록, `false` 일 경우 블랙리스트에 미등록, `error` 일 경우 블랙리스트 에러로 불러오지 못한 경우이며, body 가 반환됩니다.

`'fail'` 일 경우 Javascript 에러로 인해 검색에 실패한 경우이며, Javascript Error 로그가 반환됩니다.

### ip query

#### 역할 및 설명

```javascript
query.callback.ip(ip address(string)[, timeout(int)], callback(function));
```

`ip` 인자는 String 형으로 `IPv4` 를 입력합니다.

#### 사용 예시

```javascript
query.callback.ip('127.0.0.1', callback);

query.callback.ip('127.0.0.1', 1, callback);

query.callback.ip('127.0.0.1', function(err, res) {
    if(err) console.log(err);
    console.log(res);
});
```

#### 반환

```javascript
{ timeout: 3000 /* timeout 인자 또는 기본값 */,
  query: '127.0.0.1'/* 검색한 ip address */,
  response: /* 검색 결과를 반환합니다. */
   { 'mc-blacklist': { status: false },
     'k-spam': { status: 'fail', error: [Object] }
   }
}
```

### uuid query

#### 역할 및 설명

```javascript
query.callback.uuid(uuid(string)[, timeout(int)], callback(function));
```

`uuid` 인자는 String 형으로 `UUID` 를 입력합니다.

36자로 된 `Full UUID` 또는, 32글자로 된 `UUID`를 입력합니다.

```javascript
query.callback.uuid('2e45712e-3747-4280-94cb-1d39fe7ee434', callback); // Full UUID
query.callback.uuid('2e45712e3747428094cb1d39fe7ee434', callback); // UUID
```

#### 사용 예시

```javascript
query.callback.uuid('2e45712e3747428094cb1d39fe7ee434', 1, callback);

query.callback.uuid('2e45712e3747428094cb1d39fe7ee434', function(err, res) {
    if(err) console.log(err);
    console.log(res);
});
```
#### 반환

```javascript
{ timeout: 3000 /* timeout 인자 또는 기본값 */,
  query: '2e45712e-3747-4280-94cb-1d39fe7ee434' /* 검색한 UUID */,
  response: /* 검색 결과를 반환합니다. */
   { 'mc-blacklist': { status: false }}
}
```

### nickname query

#### 역할 및 설명

```javascript
query.callback.nick(nickname(string)[, timeout(int)], callback(function));
```

`nickname` 인자는 String 형으로 `마인크래프트 닉네임` 을 입력합니다.

#### 사용 예시

```javascript
query.callback.nick('trusty_people', 1, callback);

query.callback.nick('trusty_people', function(err, res) {
    if(err) console.log(err);
    console.log(res);
});
```

#### 반환

```javascript
{ timeout: 3000 /* timeout 인자 또는 기본값 */,
  query: 'trusty_people' /* 검색한 Nickname */,
  response: /* 검색 결과를 반환합니다. */
   { 'mc-blacklist': { status: false }}
}
```

### nickname to uuid

#### 역할 및 설명

`마인크래프트 닉네임` 을 `UUID` 로 변환하고 싶을 경우 `n2u` 함수를 사용합니다.

```javascript
query.callback.n2u(nickname(string)[, timeout(int)], callback(function));
```

`nickname` 인자는 String 형으로 `마인크래프트 닉네임` 를 입력합니다.

#### 예시

```javascript
query.callback.n2u('trusty_people', 1, callback);

query.callback.n2u('trusty_people', function(err, res) {
    if(err) console.log(err);
    console.log(res);
});
```

#### 반환

```javascript
{ timeout: 3000 /* timeout 인자 또는 기본값 */,
  query: 'trusty_people'/* 검색한 Nickname */,
  response: '2e45712e-3747-4280-94cb-1d39fe7ee434' /* UUID를 반환합니다. */,
  result: 'success' /* 검색 결과를 반환합니다. */}
```

`result` 가 `'success'` 일 경우 정품 유저이며, `response` 에 `UUID`가 담깁니다. `result` 가 `'fail'` 일 경우 등록되지 않은 닉네임입니다.
`result` 가 `'error'` 일 경우 API 서버의 문제로 검색에 실패한 경우이며, Javascript Error 로그가 반환됩니다.

## Promise 방식

`blacklist-query` Object 안의 `promise` Object를 호출하여 사용이 가능합니다.

`Promise` 패턴을 적용 할 경우, 다음과 같이 사용합니다.

```javascript
query.promise.nick('trusty_people')
    .then((result) => {
        resolve(result);
    })
    .catch((error) => {
        reject(error);
    });
```

`query.promise.ip` 함수, `query.promise.nick` 함수 같은 함수가 Promise 패턴이 적용된 함수입니다.

`Promise` 에서 사용하지 않는 `callback` 함수만 없애주시면 정상작동합니다.

## Async/Await 패턴 (ECMAScript 2017)

`Async/Await` 패턴을 사용하실 경우 `Promise` 함수를 호출합니다.

```javascript
(async() => {
    try {
        let result = query.promise.nick('trusty_people');
        console.log(result);
    } catch(e) {
        console.error(e);
    }
})();
```

위와 같은 방식으로 `Async/Await` 패턴을 적용해주시면 됩니다.

단 `Node.js 7.5` 에서 `--harmony` flag 를 사용하여야 하며, `Node.js 7.10.0` 이상에서 공식적으로 지원하는 패턴입니다.

## Script Test

Script Test 명령어는 다음과 같습니다.

### Async Waterfall
```npm run test```

### Promise
```npm run testpro```

## 블랙리스트 추가

블랙리스트 추가는 [Github Issues](https://github.com/small-sunshines/blacklist-query/issues) 에 다음의 내용을 담아 요청해 주실 경우 다음 버전에 추가해드립니다.

※ 단 API 가 아닐 경우 받지 않습니다.

```
검색 유형: (IP, UUID, Nickname 3개 항목중 선택, 다중선택 가능)
검색 URL: (IP, UUID, Nickname 중 선택한 항목을 검색할 URL을 입력해주세요.)
```

## 업데이트 내역

### 2.0.1
이전부터 있었지만 제가 파악하지 못한 버그를 수정하였습니다. 반드시 업데이트 해주시기 바랍니다.

### 2.0.0
구조를 전부 바꾸었습니다. ECMAScript 2017의 async/await 패턴을 공식적으로 지원합니다. 단 `Node.js 7.5` 에서 `--harmony` flag 를 사용하여야 하며, `Node.js 7.10.0` 이상에서 공식적으로 지원하는 패턴입니다.

### 1.3.5
`MC-Blacklist.kr` 운영자의 요청에 의해 API 호출 주소가 변경되었습니다.

### 1.3.4
실수로 변경못한 readme.md 가 수정되었으며, 그에 따른 업데이트입니다.

### 1.3.3
jsdoc 를 적용하였으며, 일부 테스트 케이스를 변경하였습니다. 내부 처리함수가 변경되었습니다.

### 1.3.2
Github 계정 업데이트 관련 적용

### 1.3.1
K-Spam 미작동으로 인한 주석처리, MC-Blacklist API 주소변경, readme.md 파일 수정
앞으로는 K-Spam 에서 블랙리스트 정보를 가져오지 않습니다.

### 1.3.0
작동 구조 변경, Promise 패턴 적용, readme.md 파일 수정

### 1.2.5
readme.md 파일 오타 수정.

### 1.2.4
변수 구조 일부 변경, readme.md 파일 수정, Git Repository 추가에 따른 package.json 파일 수정.

### 1.2.2
readme.md 파일 오타 수정.

### 1.2.1
Description 수정, readme.md 파일 일부 수정.

### 1.2.0
함수 수정, readme.md 파일 수정.

### 1.1.2
readme.md 파일의 가독성 수정.

### 1.1.1
일부 오류 수정.

### 1.1.0
readme.md 파일의 가독성 수정.

query 함수 수정 및 timeout 인자 추가.

query 함수 구조 수정

nickname_to_uuid 함수 설명 추가

### 1.0.6
readme.md 파일의 코드 가독성이 안좋은 것을 다시 수정하였습니다.

일부 잘못된 예제를 수정하였습니다.

### 1.0.5
readme.md 파일의 코드 가독성이 안좋은 것을 수정하였습니다.

### 1.0.4
readme.md 파일을 조금 수정하였습니다.

### 1.0.3
여전히 가독성이 좋지 않은 readme.md 파일을 수정하였습니다.
의존성 패키지의 버전도 같이 표기하였습니다.

### 1.0.2
readme.md 파일의 가독성을 조금 높히고, 일부 누락된 부분을 작성하였습니다.

### V1.0.1
중복 코드를 하나의 함수로 합쳤습니다.

### V1.0.0
최초 버전

## 제작자
볕뉘(small_sunshine)[npmjs](https://www.npmjs.com/~trusty_people) [github](https://github.com/small_sunshines)