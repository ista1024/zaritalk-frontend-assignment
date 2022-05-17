# zaritalk-frontend-assignment

## 김용태 자리톡 프론트엔드 과제
```tsx
npm install
&&
npm run start
// 혹은
npm run dev
```
실행 후 localhost:3000으로 접속하시면 됩니다.
이후에 랜딩페이지의 링크를 클릭하거나 직접 url을 입력하여 페이지 이동이 가능합니다.

해당 과제는 Next.js, tailwindCss, TypeScript 로 구현되었습니다.

Mock API는 Next.js의 api 모듈을 사용했으며

"/api/community/["categories", "posts", "posts/:post_pk"]로 요청 가능합니다.

Community List "/community/list"
Community Detail "/community/post/:post_pk"
Community New "/community/post/new"

---
### 해당 과제에 관한 부가 설명
1. [미구현] 페이지 전환 시 스크롤 높이 유지는 로컬스토리지(상태관리 라이브러리 등) 전역변수에 clientY 저장하고, useEffect로 mount시 scrollY로 구현할 예정이었습니다.
2. 좋아요 상태 유지는 api 통신을 통해 서버에서 값을 증가시켜야 하므로, API 통신 코드예제를 작성하였습니다.
3. 새로운 글 작성시 api 통신을 통해 서버에 저장하는 api 호출 함수를 작성하였습니다.

---
소스 관리에 대한 부분은 GitHub에도 올라가 있습니다.
자세한 로그는 깃허브에서 확인 가능하며, 아래 링크를 클릭하세요

[GitHub 링크](https://github.com/ista1024/zaritalk-frontend-assignment) -
https://github.com/ista1024/zaritalk-frontend-assignment