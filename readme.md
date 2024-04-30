## module federation 
webpack을 이용한 module federation적용  
<mark>webpack.config.js</mark>에 output옵션에 publicPath설정이 중요 다른 path등을 설정하면 공유모듈 로드에서 에러발생함. (확인 필요)
```javascript
output: {
    publicPath: "auto"
}
```
## msw를 이용한 Mocking
> <mark>Mock Service Worker</mark>의 약자로 클라이언트에 구애받지 않는 Mocking을 작성하고 모든 프레임워크, 도구 및 환경에서 재사용할 수 있는 API Mocking 라이브러리.

### 주요 사용법
 - 모듈설치
    >  pnpm add -D msw
 - 요청을 위한 handlers정의
    ```javascript
        import {http, HttpResponse} from "msw";
        const handlers =[
            http.get("http://api.example.com/persons", ({request, params})=>{
                return HttpResponse.json([
                    {
                        id:1,
                        name:'ae',
                        image:'dd'
                    },
                    {
                        id:2,
                        name:'chae',
                        image:'ee'
                    },
                ])
            }),
            http.post("http://api.example.com/person", async ({request, params, cookies})=>{
                cont requestBody = await request.json();
                return HttpResponse.json()
            })
        ] 
        export default handlers;
    ```
 - setup(node, browser)
    ```javascript
        //setupServer(node)
        import { setupServer } from 'msw/node'
        import { handlers } from './handlers'
        export const server = setupServer(...handlers)

        //setupWorker(brower)
        import { setupWorker } from 'msw/browser'
        import { handlers } from './handlers'
        export const server = setupWorker(...handlers)
    ```
 - 노드 초기화
    ```javascript
        
        import { server } from './mocks/node'
        server.listen(); // 요청 listen

        async function fetchPerson() {
            const response = fetch('https://example.com/person')
            const person = await response.json()
            console.log(person)
        }
        fetchPerson()
    ```
 - 브라우저 초기화
   - serviceWorker를 위한 기본 js생성 필요.
        > npx msw init <mark><PUBLIC_DIR></mark>
   - app시작 전 worker초기화 
    ```javascript
    async function enableMocking() {
        if(process.env.NODE_ENV === 'development') {
            const { worker } = await import('./mocks/browser');
            return worker.start()
        }
        return Promise.resolve();
    }
    function render(){
        // render app
    }
    enableMocking().then(render);
    ```

### 주의사항
 - path에 파라미터를 적용 시 서로 별도 등록을 해야 매칭이 적용됨.
    ```javascript
        //개별 목록요청
        //id값이 없이 넘기면 이곳에 매칭되길 기대하지만 404에러 발생.
        http.get("/person/:id", ()=>{});
        //전체 목록요청 
        http.get("/person", ()=>{});
    ```