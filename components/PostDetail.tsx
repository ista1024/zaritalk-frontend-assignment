import type { NextPage } from "next";
import Link from "next/Link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { postData } from "../types/communityType";

// MdVisibility: 눈알, MdThumbUp: 좋아요 색, MdThumbUpOffAlt: 좋아요 테두리
import { MdVisibility, MdThumbUp, MdThumbUpOffAlt } from "react-icons/md";
// BsChatDotsFill: 댓글 색, BsChatDots: 댓글 테두리
import { BsChatDotsFill, BsChatDots } from "react-icons/bs";
import { compareDate } from "../utils/util";

import styles from "../styles/global.module.css";

interface postProps {
  data: postData;
}

const PostDetail: NextPage<postProps> = ({ data }: postProps) => {
  const [isButtonClicked, setIsButtonClicked] = useState<number>(0);
  const [post, setPost] = useState<postData>(data);

  // 좋아요 눌렀는지 확인 및 카운트 변경
  const [likes, setLikes] = useState<boolean>(false);
  const [likesCount, setLlkesCount] = useState<number>(data.likeCount);

  // 좋아요 핸들링
  const handleLikes = () => {
    setLikes(!likes);
    likes ? setLlkesCount(likesCount - 1) : setLlkesCount(likesCount + 1);
  };

  // 이미지 src 파서
  const imgSrc = (url: string | null) => {
    return url ? url : "";
  };

  // 링크 파서
  const createLinkFromText = (text: string) => {
    const regex = /(https?:\/\/[^\s]+)/g;
    const match = text.match(regex);
    if (match) {
      const link = `<a className="underline decoration-sky-500" href=${match[0]}>${match[0]}</a>`;
      return text.replace(match[0], link);
    } else {
      return text;
    }
  };

  (() => {
    createLinkFromText(post.content);
  })();

  return (
    <div className={"flex flex-col  mb-1 py-4 bg-white "}>
      {/* <div>{post.pk}</div> */}
      <div>
        <div className="flex align-center my-2">
          <div className="flex self-center mx-2">
            <Image
              src={imgSrc(post.writerProfileUrl)}
              width={30}
              height={30}
              alt="profile"
            />
          </div>
          <div>
            <p className="text-gray text-xs">{post.writerNickName}</p>
            <p className="text-gray-400 text-xs">
              {post.categoryName} ㆍ {compareDate(post.writtenAt)}
            </p>
          </div>
        </div>
        <div className="my-2">
          <p className="font-semibold mt-4">{post.title}</p>
          <div
            className="text-sm text-gray-500 my-2"
            dangerouslySetInnerHTML={{
              __html: createLinkFromText(post.content),
            }}
          ></div>
        </div>
      </div>
      {!!post.imageUrl ? (
        <div className="my-2 w-full relative">
          <Image
            src={imgSrc(post.imageUrl)}
            layout="fill"
            alt="post"
            objectFit="cover"
          />
        </div>
      ) : null}
      <div className="flex text-gray-500  align-center">
        <div className="flex mx-2" onClick={() => handleLikes()}>
          {likes ? (
            <MdThumbUp className="self-center" />
          ) : (
            <MdThumbUpOffAlt className="self-center" />
          )}
          <span className="mx-2">{likesCount}</span>
        </div>
        <div className="flex mx-2">
          <BsChatDots className="self-center" />
          <span className="mx-2">{post.commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
