import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { ImFilePicture } from "react-icons/im";
import {
  IoIosCloseCircle,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";

import { categoryData } from "../../../types/communityType";

const NewPost: NextPage = () => {
  const router = useRouter();
  const inputEl = useRef<HTMLInputElement[]>([]);

  const [categories, setCategories] = useState<categoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<categoryData | null>(
    null
  );
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File[]>([]);
  const [createObjectURL, setCreateObjectURL] = useState<string[]>([]);

  // fetch to get category list async function
  const getCategories = async () => {
    const response: Response = await fetch("/api/community/categories");
    const categoryList: categoryData[] = await response.json();
    setCategories(categoryList);
  };
  useEffect(() => {
    (async () => {
      await Promise.all([getCategories()]);
    })();
  }, []);

  // 사진 버튼 클릭 시 작동하는 파일 업로드용 인풋
  const handleClick = () => {
    if (image.length < 5) {
      console.log(image.length);
      inputEl.current![image.length].click();
    }
  };

  useEffect(() => {
    if (!!selectedCategory && title && content) {
      setIsReady(true);
    }
  }, [selectedCategory, title, content]);

  // 이미지 업로드 시 작동하는 함수
  const uploadToClient = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newImage = [...image];
    newImage.push(e.target.files![0]);
    setImage(newImage);

    const files = e.target.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      const objectURL = URL.createObjectURL(file);
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImage([...image, file]);
        setCreateObjectURL([...createObjectURL, objectURL]);
      };
    }
  };

  const contentPlaceHolder: string = `내용을 작성해주세요.\n\n
  ◎ 사진 및 외부 콘텐츠 첨부시 영향력 상승!
  ◎ 뉴스, 블로그 등 외부 콘텐츠는 https:// 링크를 붙여 넣으세요. 본문에 썸네일로 표시됩니다.
  ◎ 광고글 금지. 서비스 이용이 제한됩니다. `;

  // 완료버튼 클릭 시 서버에 전송하는 함수
  const handleSubmit = async (event: any) => {
    if (!isReady) return;
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", selectedCategory!.categoryCode);
    if (image.length > 0) {
      image.map((i: any) => {
        formData.append("image", i);
      });
    }
    const response: Response = await fetch("/api/community/post/new", {
      method: "POST",
      body: formData,
    });
    // const result: any = await response.json();
    // if (result.success) {}
    router.push("/community/list", `/community/list`);
  };

  return (
    <div className={"flex justify-center mt-8 "}>
      <Head>
        <title>커뮤니티_글작성</title>
        <meta name="description" content="커뮤니티_글작성" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center w-96">
        <div className="flex items-center justify-between py-4 border-b-2">
          <MdKeyboardBackspace
            className={"text-2xl  cursor-pointer"}
            onClick={() => router.back()}
          />
          <span className="mx-2 text-lg font-extrabold">글쓰기</span>
          <button
            className={
              (!isReady
                ? "bg-gray-200 cursor-default"
                : "bg-blue-500 hover:bg-blue-700") +
              " text-white font-bold py-2 px-4 rounded-lg"
            }
            onClick={handleSubmit}
          >
            완료
          </button>
        </div>
        <div
          className="flex w-full py-4 px-2 border-b-2"
          onClick={() => setIsDropdown(!isDropdown)}
        >
          {selectedCategory ? selectedCategory.categoryName : "카테고리 선택"}
          {!isDropdown ? (
            <>
              <IoMdArrowDropdown className="flex self-center mx-1" />
            </>
          ) : (
            <>
              <IoMdArrowDropup className="flex self-center mx-1" />
              <div className="relative">
                <div className="absolute bg-white rounded-lg shadow-lg">
                  <ul className="relative bg-white">
                    {categories.map((category) => (
                      <li
                        key={category.categoryPk}
                        className="relative inline-block py-2 px-2 border-2"
                        style={{ width: "120px" }}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsDropdown(false);
                        }}
                      >
                        <span className="text-sm font-extrabold">
                          {category.categoryName}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="w-full border-b-2">
          <input
            className="w-full py-4 px-2 "
            placeholder="제목을 입력해주세요"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full">
          <textarea
            className="w-full py-2 px-2 h-80"
            placeholder={contentPlaceHolder}
            style={{ resize: "none" }}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-center items-center border-b-2">
          {createObjectURL.length > 0
            ? createObjectURL.map((url: string, index: number) => (
                <div
                  key={index}
                  className="flex flex-row justify-center items-center border-b-2"
                >
                  <Image src={url} width={80} height={80} alt="이미지" />
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded-lg"
                    onClick={() => {
                      const newImage = [...image];
                      newImage.splice(index, 1);
                      setImage(newImage);
                      const newCreateObjectURL = [...createObjectURL];
                      newCreateObjectURL.splice(index, 1);
                      setCreateObjectURL(newCreateObjectURL);
                    }}
                  >
                    <IoIosCloseCircle />
                  </button>
                </div>
              ))
            : null}
        </div>
        {image.length < 4
          ? [...Array(image.length + 1)].map((i: any, index: number) => (
              <input
                key={index}
                type="file"
                className="hidden"
                accept="image/*"
                ref={(el: HTMLInputElement) => (inputEl.current[index] = el)}
                onChange={(e) => {
                  uploadToClient(e, index);
                }}
              />
            ))
          : null}
        <div className="my-16">
          <label htmlFor="contained-button-file">
            <button
              className="flex justify-center p-2 pr-3 font-semibold text-sm text-blue-700 bg-blue-100 rounded-lg"
              onClick={handleClick}
            >
              <ImFilePicture className="flex self-center mx-1" />
              사진
              {`(${image.length}/6)`}
            </button>
          </label>
        </div>
      </main>
    </div>
  );
};

export default NewPost;
