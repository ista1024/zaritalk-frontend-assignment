import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { postData } from "../../../../types/communityType";
import PostDetail from "../../../../components/PostDetail";

import { MdKeyboardBackspace } from "react-icons/md";

const emptyPost: postData = {
  categoryPk: -1,
  categoryName: "",
  pk: -1,
  title: " ",
  content: " ",
  viewCount: -1,
  likeCount: -1,
  commentCount: -1,
  imageUrl: null,
  writtenAt: " ",
  writerNickName: " ",
  writerProfileUrl: null,
};

const Home: NextPage = () => {
  const router = useRouter();
  const { post_pk } = router.query;

  const [post, setPost] = useState<postData>(emptyPost);

  // fetch to get post list async function
  const getPosts = async () => {
    const response = await fetch(`/api/community/posts/${post_pk}`);
    const data = await response.json();
    setPost(data);
    // setFilteredPosts(postList);
  };

  useEffect(() => {
    if (!!post_pk && post.pk === -1) {
      (async () => {
        await Promise.all([getPosts()]);
      })();
    }
  }, [post_pk]);

  return (
    <div className={"flex justify-center mt-8"}>
      <Head>
        <title>커뮤니티_디테일</title>
        <meta name="description" content="커뮤니티_글작성" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"flex flex-col justify-center w-96"}>
        <div
          className={"flex items-center cursor-pointer"}
          onClick={() => router.back()}
        >
          <MdKeyboardBackspace className={"text-2xl"} />
          <span className={"text-gray-400 mx-2"}>글 목록으로</span>
        </div>
        {!!post && post.pk !== -1 ? (
          <>
            <PostDetail data={post} />
          </>
        ) : (
          <div>없는 포스트입니다.</div>
        )}
      </main>
    </div>
  );
};

export default Home;
