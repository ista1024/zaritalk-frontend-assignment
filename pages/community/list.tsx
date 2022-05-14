import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/Link";
import Image from "next/image";

import { categoryData, postData } from "../../types/communityType";

import Category from "../../components/Category";
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
        <Category
          categories={categories}
          handleCategoryFilter={handleCategoryFilter}
          categoryFilter={categoryFilter}
        />
        {filteredPosts.map((post) => (
          <Post key={`Post ${post.pk}`} data={post}></Post>
        ))}
        <button></button>
      </main>
    </div>
  );
};

export default CommunityList;
