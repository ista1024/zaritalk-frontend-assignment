import type { NextPage } from "next";
import Head from "next/head";

import Link from "next/Link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { categoryData, postData } from "../../types/communityType";
import styles from "../../styles/Home.module.css";

// component  구성
/* header
 * Community category
 * Community list item
 */
const Home: NextPage = () => {
  const [categories, setCategories] = useState<categoryData[]>([]);
  const [posts, setPosts] = useState<postData[]>([]);
  const [isButtonClicked, setIsButtonClicked] = useState<number>(0);
  const [categoryFilter, setCategoryFilter] = useState<string>("");

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
    console.log("getPosts", postList);
  };

  // call all async function on mount
  useEffect(() => {
    (async () => {
      await Promise.all([getCategories(), getPosts()]);
    })();
    console.log("Home");
  }, []);

  // category filter setter & active button
  const handleCategoryFilter = (category: string, idx: number) => {
    setCategoryFilter(category);
    setIsButtonClicked(idx);
    console.log("handleCategoryFilter", category, idx);
  };

  return (
    <div>
      <Head>
        <title>커뮤니티_홈</title>
        <meta name="description" content="커뮤니티_홈" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Community List</h1>
        {categories.map((category, idx) => (
          <button
            key={category.categoryPk}
            onClick={() => handleCategoryFilter(category.categoryCode, idx)}
            className={`${
              isButtonClicked === idx ? "bg-blue-500" : "bg-transparent"
            } hover:bg-blue-700 border border-blue-500 hover:text-white font-bold py-2 px-4 rounded-full`}
          >
            {category.categoryName}
          </button>
        ))}
        <div>
          <p>{categoryFilter}</p>
        </div>
        {posts.map((post) => (
          <p key={post.pk}>
            <Link
              key={post.pk}
              href="/community/post/[post]"
              as={`/community/post/${post.categoryPk}`}
            >
              <a>{post.title}</a>
            </Link>
          </p>
        ))}
      </main>
    </div>
  );
};

export default Home;
