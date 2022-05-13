import type { NextPage } from "next";
import Head from "next/head";

import Image from "next/image";
import styles from "../../styles/Home.module.css";

// component  구성
/* header
 * Community category
 * Community list item
 */
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>커뮤니티_홈</title>
        <meta name="description" content="커뮤니티_홈" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-3xl font-bold underline">Community List</h1>
      </main>
    </div>
  );
};

export default Home;
