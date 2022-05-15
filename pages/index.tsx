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

        <p className={styles.description}></p>
        <Link href="/community/list">
          <a>Community List {`"/community/list"`}</a>
        </Link>
        <Link href="/community/post/1">
          <a>Community Detail {`"/community/post/:post_pk"`}</a>
        </Link>
        <Link href="/community/post/new">
          <a>Community New {`"/community/post/new"`}</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
