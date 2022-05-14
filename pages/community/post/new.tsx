import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import styles from "../../../styles/Home.module.css";

const Home: NextPage = () => {
  const contentPlaceHolder: string = `내용을 작성해주세요.\n

  ◎ 사진 및 외부 콘텐츠 첨부시 영향력 상승!
  ◎ 뉴스, 블로그 등 외부 콘텐츠는 https:// 링크를 붙여 넣으세요. 본문에 썸네일로 표시됩니다.
  ◎ 광고글 금지. 서비스 이용이 제한됩니다.`;
  return (
    <div className={styles.container}>
      <Head>
        <title>커뮤니티_글작성</title>
        <meta name="description" content="커뮤니티_글작성" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1 className="text-3xl font-bold">글쓰기</h1>
          <button>완료</button>
        </div>
        <div>
          <input placeholder="제목을 입력해주세요" />
        </div>
        <div>
          <textarea placeholder={contentPlaceHolder} />
        </div>
      </main>
    </div>
  );
};

export default Home;
