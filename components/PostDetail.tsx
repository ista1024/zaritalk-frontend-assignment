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
      return "";
    }
  };

  (() => {
    createLinkFromText(post.content);
  })();

  return (
    <div className="flex flex-col">
      {/* <div>{post.pk}</div> */}
      <div>
        <Image
          src={imgSrc(post.writerProfileUrl)}
          width={30}
          height={30}
          alt="profile"
        />
        <p className="text-gray-300">{post.writerNickName}</p>
        <p className="text-gray-300">
          {post.categoryName} ㆍ {} 분전
        </p>
      </div>
      <div>
        <p>{post.title}</p>
        <div
          dangerouslySetInnerHTML={{ __html: createLinkFromText(post.content) }}
        ></div>
      </div>
      {!!post.imageUrl ? (
        <div>
          <Image
            src={imgSrc(post.imageUrl)}
            width="100%"
            height={160}
            alt="post"
            objectFit="cover"
          />
        </div>
      ) : null}
      <div className="flex text-gray-300">
        <div onClick={() => handleLikes()}>
          {likes ? <MdThumbUp /> : <MdThumbUpOffAlt />}
        </div>
        <span>{likesCount}</span>
        <BsChatDots />
        <span>{post.commentCount}</span>
      </div>
    </div>
  );
};

export default PostDetail;
