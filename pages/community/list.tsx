import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/Link";
import Image from "next/image";

import { categoryData, postData } from "../../types/communityType";

import Post from "../../components/Post";

import styles from "../../styles/global.module.css";

// component  구성
/* header
 * Community category
 * Community list item
 */
const CommunityList: NextPage = () => {
  const [categories, setCategories] = useState<categoryData[]>([]);
  const [posts, setPosts] = useState<postData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<postData[]>([]);
  const [isButtonClicked, setIsButtonClicked] = useState<number>(0);
  const [categoryFilter, setCategoryFilter] = useState<number>(-1);

  // fetch to get category list async function
  const getCategories = async () => {
    const response = await fetch("/api/community/categories");
    const categoryList = await response.json();
    setCategories(categoryList);
    console.log("getCategories", categoryList);
  };

  // fetch to get post list async function
  const getPosts = async () => {
    const response = await fetch("/api/community/posts");
    const postList = await response.json();
    setPosts(postList);
    setFilteredPosts(postList);
    console.log("getPosts", postList);
  };

  // call all async function on mount
  useEffect(() => {
    (async () => {
      await Promise.all([getCategories(), getPosts()]);
    })();
    console.log("Home");
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
    console.log("handleCategoryFilter", idx);
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>커뮤니티_홈</title>
        <meta name="description" content="커뮤니티_홈" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold">커뮤니티</h1>
        <button
          onClick={() => handleCategoryFilter(-1)}
          className={`${
            categoryFilter === -1 ? "bg-blue-500" : "bg-transparent"
          } hover:bg-blue-700 border border-blue-500 hover:text-white font-bold py-2 px-4 rounded-full`}
        >
          전체
        </button>
        <button
          onClick={() => handleCategoryFilter(0)}
          className={`${
            categoryFilter === 0 ? "bg-blue-500" : "bg-transparent"
          } hover:bg-blue-700 border border-blue-500 hover:text-white font-bold py-2 px-4 rounded-full`}
        >
          인기
        </button>
        {categories.map((category, idx) => (
          <button
            key={`category ${category.categoryPk}`}
            onClick={() => handleCategoryFilter(category.categoryPk)}
            className={`${
              categoryFilter === category.categoryPk
                ? "bg-blue-500"
                : "bg-transparent"
            } hover:bg-blue-700 border border-blue-500 hover:text-white font-bold py-2 px-4 rounded-full`}
          >
            {category.categoryName}
          </button>
        ))}
        {filteredPosts.map((post) => (
          <Post key={`Post ${post.pk}`} data={post}></Post>
        ))}
        <button></button>
      </main>
    </div>
  );
};

export default CommunityList;
