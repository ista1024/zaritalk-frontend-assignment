import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/Link";
import { useState, useEffect } from "react";

import { categoryData, postData } from "../../types/communityType";

import Category from "../../components/Category";
import Post from "../../components/Post";

// component  구성
/* header
 * Community category
 * Community list item
 */
const CommunityList: NextPage = () => {
  const [categories, setCategories] = useState<categoryData[]>([]);
  const [posts, setPosts] = useState<postData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<postData[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<number>(-1);

  // fetch to get category list async function
  const getCategories = async () => {
    const response = await fetch("/api/community/categories");
    const categoryList = await response.json();
    setCategories(categoryList);
  };
  // fetch to get post list async function
  const getPosts = async () => {
    const response = await fetch("/api/community/posts");
    const postList = await response.json();
    setPosts(postList);
    setFilteredPosts(postList);
  };
  // call all async function on mount
  useEffect(() => {
    (async () => {
      await Promise.all([getCategories(), getPosts()]);
    })();
  }, []);

  // 필터가 변경될 때 해당 필터가 포함되는
  useEffect(() => {
    let filteredPostList: postData[] = [];
    if (categoryFilter === -1) {
      filteredPostList = posts;
    } else if (categoryFilter === 0) {
      filteredPostList = posts.filter((post) => post.viewCount >= 100);
    } else {
      filteredPostList = posts.filter(
        (post) => post.categoryPk === categoryFilter
      );
    }
    setFilteredPosts(filteredPostList);
  }, [categoryFilter]);

  // category filter setter & active button
  const handleCategoryFilter = (idx: number) => {
    setCategoryFilter(idx);
  };

  return (
    <div className="flex justify-center mt-8 ">
      <Head>
        <title>커뮤니티_홈</title>
        <meta name="description" content="커뮤니티_홈" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center w-96">
        <h1 className="text-3xl font-bold mt-8">커뮤니티</h1>
        <div className="px-2 mt-8 overflow-hidden">
          <Category
            categories={categories}
            handleCategoryFilter={handleCategoryFilter}
            categoryFilter={categoryFilter}
          />
        </div>
        <div className="mt-8 bg-gray-200">
          {filteredPosts.map((post) => (
            <Post key={`Post ${post.pk}`} data={post}></Post>
          ))}
        </div>
        <Link href={"/community/post/new"}>
          <button
            className="fixed bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            style={{ left: "60vw", bottom: "5rem" }}
          >
            글쓰기
          </button>
        </Link>
      </main>
    </div>
  );
};

export default CommunityList;
