import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>김용태 자리톡 프론트엔드 과제</title>
        <meta
          name="description"
          content="Zaritalk front end assignment with Next app with typescript and tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-3xl font-bold underline">
          <a href="https://nextjs.org">김용태 자리톡 프론트엔드 과제</a>
        </h1>

        <div className={styles.description}>
          <p>
            아래 링크를 클릭하거나 직접 url을 입력하여 페이지 이동이 가능합니다.
          </p>
          <p>해당 과제는 Next.js, tailwindCss, TypeScript 로 구현되었습니다.</p>
          <p>Mock API는 Next.js의 api 모듈을 사용했으며 </p>
          <p>
            {`"/api/community/["categories", "posts", "posts/:post_pk"]`}로 요청
            가능합니다.
          </p>
        </div>

        <Link href="/community/list">
          <a>Community List {`"/community/list"`}</a>
        </Link>
        <Link href="/community/post/1">
          <a>Community Detail {`"/community/post/:post_pk"`}</a>
        </Link>
        <Link href="/community/post/new">
          <a>Community New {`"/community/post/new"`}</a>
        </Link>
        <div className="w-3/4 mt-9">
          <p className={styles.description}>해당 과제에 관한 부가 설명</p>
          <p className="my-1">
            1. [미구현] 페이지 전환 시 스크롤 높이 유지는 로컬스토리지(상태관리
            라이브러리 등) 전역변수에 clientY 저장하고, useEffect로 mount시
            scrollY로 구현할 예정이었습니다.
          </p>
          <p className="my-2">
            2. 좋아요 상태 유지는 api 통신을 통해 서버에서 값을 증가시켜야
            하므로, API 통신 코드예제를 작성하였습니다.
          </p>
          <p className="my-2">
            3. 새로운 글 작성시 api 통신을 통해 서버에 저장하는 api 호출 함수를
            작성하였습니다.
          </p>
        </div>
      </main>

      <div>
        <p className="text-center m-2">
          소스 관리에 대한 부분은 GitHub에도 올라가 있습니다.
        </p>
        <p className="text-center m-2">
          자세한 로그는 깃허브에서 확인 가능하며, 아래 링크를 클릭하세요
        </p>
        <p className="text-center m-4">
          <a href="https://github.com/ista1024/zaritalk-frontend-assignment">
            GitHub 링크 -
            https://github.com/ista1024/zaritalk-frontend-assignment
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
