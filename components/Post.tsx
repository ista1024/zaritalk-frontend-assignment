import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/Link";
import Image from "next/image";

import { postData } from "../types/communityType";

// MdVisibility: 눈알, MdThumbUp: 좋아요 색, MdThumbUpOffAlt: 좋아요 테두리
import { MdVisibility, MdThumbUp, MdThumbUpOffAlt } from "react-icons/md";
// BsChatDotsFill: 댓글 색, BsChatDots: 댓글 테두리
import { BsChatDotsFill, BsChatDots } from "react-icons/bs";

interface postProps {
  data: postData;
}

const Post: NextPage<postProps> = ({ data }: postProps) => {
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

  // 작성 시간 파서
  const compareDate = (date: string) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hour = Math.floor(diff / (1000 * 60 * 60));
    const minute = Math.floor(diff / (1000 * 60));
    if (day > 0) {
      return date.slice(2, 10);
    } else if (hour > 0) {
      return `${hour}시간 전`;
    } else if (minute > 0) {
      return `${minute}분 전`;
    } else {
      return `방금 전`;
    }
  };

  return (
    <div className="flex flex-col mb-1 py-4 bg-white cursor-pointer">
      {/* <div>{post.pk}</div> */}
      <Link href={`/community/post/${post.pk}`}>
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
              <p className="text-xs">{post.writerNickName}</p>
              <p className="text-gray-400 text-xs">
                {post.categoryName} ㆍ {compareDate(post.writtenAt)}
              </p>
            </div>
          </div>
          <div className="my-2">
            <p className="font-semibold mt-4">
              {post.title.length > 26
                ? `${post.title.substring(0, 26)}...`
                : post.title}
            </p>
            <p className="text-xs text-gray-400 my-2">
              {post.content.length > 70
                ? `${post.content.substring(0, 70)}...`
                : post.content}
            </p>
          </div>
        </div>
      </Link>
      {!!post.imageUrl ? (
        <div className="my-2 w-full relative" style={{ height: "160px" }}>
          <Image
            src={imgSrc(post.imageUrl)}
            layout="fill"
            alt="post"
            objectFit="cover"
          />
        </div>
      ) : null}
      <div className="flex text-gray-300 align-center">
        <div className="flex mx-2">
          <MdVisibility className="text-gray-300 self-center" />
          <span className="mx-2">{post.viewCount}</span>
        </div>
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

export default Post;
