## module federation 
webpack을 이용한 module federation적용  
<mark>webpack.config.js</mark>에 output옵션에 publicPath설정이 중요 다른 path등을 설정하면 공유모듈 로드에서 에러발생함. (확인 필요)
```javascript
output: {
    publicPath: "auto"
}
```
  