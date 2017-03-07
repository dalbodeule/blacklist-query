# blacklist-query
역할: 마인크래프트 유저의 UUID나 ip가 차단되어있나 확인합니다.

## 현재 버전:
V1.2.2

## 차단되어 있는지 확인 하는 곳
[K-Spam](http://cafe.naver.com/kspam) - IP를 검색합니다.

[MC-Blacklist](https://mc-blacklist.kr/) - IP, UUID, Nickname 를 검색합니다.

## 라이선스
MIT

## 의존성 패키지
1. async (2.1.4 이상)
2. request (2.79.1 이상)
3. moment(test.js 작동시간 확인용으로 사용) (2.17.1 이상)
4. node.js (3.10 이상)

## 모듈 로드

```javascript
var query = require('blacklist-query');
```

## ip query

```javascript
query.ip(ip address(string)[, timeout(int)], callback(function));
```

`ip` 인자는 String 형으로 `IPv4` 를 입력합니다.

```javascript
query.ip('127.0.0.1', callback);
```

`timeout` 인자는 선택 인자 입니다. 만약 입력할 경우 timeout 이 지정됩니다.

`timeout` 인자를 입력하지 않을 경우 기본 3초로 timeout 이 지정됩니다.

만약 1 으로 지정할 경우, 1초 이내에 응답이 없을 경우 실패로 간주합니다.

```javascript
query.ip('127.0.0.1', 1, callback);
```

`callback` 인자는 콜백 처리 함수를 입력합니다.

```javascript
query.ip('127.0.0.1', function(err, res) {
    if(err) console.log(err);
    console.log(res);
});
```

반환은 다음과 같이 됩니다.

```javascript
{ timeout: 3 /* timeout 인자 또는 기본값 */,
  query: '127.0.0.1' /* 검색한 ip address */,
  response: { 'k-spam': 'fail', 'mc-blacklist': false } /* 검색 결과를 반환합니다. */
}
```

결과가 `true` 일 경우 블랙리스트에 등록, `false` 일 경우 블랙리스트에 미등록, `'fail'` 일 경우 블랙리스트 서버의 문제로 검색에 실패한 경우입니다.

### uuid query

```javascript
query.uuid(uuid(string)[, timeout(int)], callback(function));
```

`uuid` 인자는 String 형으로 `UUID` 를 입력합니다.

36자로 된 `Full UUID` 또는, 32글자로 된 `UUID`를 입력합니다.

```javascript
query.uuid('2e45712e-3747-4280-94cb-1d39fe7ee434', callback); // Full UUID
query.uuid('2e45712e3747428094cb1d39fe7ee434', callback); // UUID
```

`timeout` 인자는 선택 인자 입니다. 만약 입력할 경우 timeout 가 지정됩니다.

`timeout` 인자를 입력하지 않을 경우 기본 3초로 timeout 가 지정됩니다.

만약 1 으로 지정할 경우, 1초 이내에 응답이 없을 경우 실패로 간주합니다.

```javascript
query.uuid('2e45712e3747428094cb1d39fe7ee434', 1, callback);
```

`callback` 인자는 콜백 처리 함수를 입력합니다.

```javascript
query.uuid('2e45712e3747428094cb1d39fe7ee434', function(err, res) {
    if(err) console.log(err);
    console.log(res);
});
```

반환은 다음과 같이 됩니다.

```javascript
{ timeout: 3 /* timeout 인자 또는 기본값 */,
  query: '2e45712e3747428094cb1d39fe7ee434' /* 검색한 UUID */,
  response: { 'mc-blacklist': false } /* 검색 결과를 반환합니다. */
}
```

결과가 `true` 일 경우 블랙리스트에 등록, `false` 일 경우 블랙리스트에 미등록, `'fail'` 일 경우 블랙리스트 서버의 문제로 검색에 실패한 경우입니다.

## nickname query

```javascript
query.nickname(nickname(string)[, timeout(int)], callback(function));
```

`nickname` 인자는 String 형으로 `마인크래프트 닉네임` 을 입력합니다.

```javascript
query.ip('127.0.0.1', callback);
```

`timeout` 인자는 선택 인자 입니다. 만약 입력할 경우 timeout 가 지정됩니다.

`timeout` 인자를 입력하지 않을 경우 기본 3초로 timeout 가 지정됩니다.

만약 1 으로 지정할 경우, 1초 이내에 응답이 없을 경우 실패로 간주합니다.

```javascript
query.ip('127.0.0.1', 1, callback);
```

`callback` 인자는 콜백 처리 함수를 입력합니다.

```javascript
query.ip('127.0.0.1', function(err, res) {
    if(err) console.log(err);
    console.log(res);
});
```

반환은 다음과 같이 됩니다.

```javascript
{ timeout: 3 /* timeout 인자 또는 기본값 */,
  query: 'trusty_people' /* 검색한 마인크래프트 닉네임 */,
  response: { 'mc-blacklist': false } /* 검색 결과를 반환합니다. */
}
```

결과가 `true` 일 경우 블랙리스트에 등록, `false` 일 경우 블랙리스트에 미등록, `'fail'` 일 경우 블랙리스트 서버의 문제로 검색에 실패한 경우입니다.

## nickname to uuid

`마인크래프트 닉네임` 을 `UUID` 로 변환하고 싶을 경우 `nickname_to_uuid` 함수를 사용합니다.

```javascript
query.nickname_to_uuid(nickname(string)[, timeout(int)], callback(function));
```

`nickname` 인자는 String 형으로 `마인크래프트 닉네임` 를 입력합니다.

```javascript
query.nickname_to_uuid('trusty_people', callback);
```

`timeout` 인자는 선택 인자 입니다. 만약 입력할 경우 timeout 이 지정됩니다.

`timeout` 인자를 입력하지 않을 경우 기본 3초로 timeout 이 지정됩니다.

만약 1 으로 지정할 경우, 1초 이내에 응답이 없을 경우 실패로 간주합니다.

```javascript
query.nickname_to_uuid('trusty_people', 1, callback);
```

`callback` 인자는 콜백 처리 함수를 입력합니다.

```javascript
query.nickname_to_uuid('trusty_people', function(err, res) {
    if(err) console.log(err);
    console.log(res);
});
```

만약 닉네임이 존재할 경우, `err` 변수는 `false` 로 설정되며,
`res` 변수에 `UUID` 가 담겨 전달됩니다. `Full UUID` 가 아닌 `UUID` 가 담겨 전달됩니다.

만약 닉네임이 존재하지 아니할 경우, `err` 변수는 `true` 로 설정되며,
`res` 변수는 `null` 로 설정됩니다.

만약 에러가 발생할 경우, `err` 변수는 `true` 로 설정되며, `res` 변수에 `Response Body` 가 전달됩니다.

성공시 `res` 변수:
```javascript
'2e45712e3747428094cb1d39fe7ee434'
```

실패시 `res` 변수:
```javascript
null
```

## 업데이트 내역

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
[미쁨_trusty(trusty_people)](https://www.npmjs.com/~trusty_people)