import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useRef } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { ImFilePicture } from "react-icons/im";

const NewPost: NextPage = () => {
  const router = useRouter();

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const inputEl = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputEl.current) {
      inputEl.current!.click();
    }
  };

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      // setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const contentPlaceHolder: string = `내용을 작성해주세요.\n

  ◎ 사진 및 외부 콘텐츠 첨부시 영향력 상승!
  ◎ 뉴스, 블로그 등 외부 콘텐츠는 https:// 링크를 붙여 넣으세요. 본문에 썸네일로 표시됩니다.
  ◎ 광고글 금지. 서비스 이용이 제한됩니다. `;

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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            완료
          </button>
        </div>
        <div className="w-full py-4 px-2 border-b-2">카테고리 드롭다운</div>
        <div className="w-full border-b-2">
          <input
            className="w-full py-4 px-2 "
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div className="w-full">
          <textarea
            className="w-full py-2 px-2 h-80"
            placeholder={contentPlaceHolder}
            style={{ resize: "none" }}
          />
        </div>
        {createObjectURL ? (
          <Image src={createObjectURL} width={160} height={160} alt="이미지" />
        ) : null}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={inputEl}
        />
        <div className="my-16">
          <label htmlFor="contained-button-file">
            <button
              className="flex justify-center p-2 pr-3 font-semibold text-sm text-blue-700 bg-blue-100 rounded-lg"
              onClick={handleClick}
            >
              <ImFilePicture className="flex self-center mx-1" />
              사진
              {`(0/6)`}
            </button>
          </label>
        </div>
      </main>
    </div>
  );
};

export default NewPost;
