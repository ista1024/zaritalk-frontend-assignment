import type { NextPage } from "next";

import Link from "next/Link";
import Image from "next/image";
import { useState, useEffect } from "react";

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
  const [likes, setLikes] = useState<boolean>(false);

  const handleLikes = () => {
    setLikes(!likes);
  };

  return (
    <>
      <div>{post.pk}</div>
      <div>
        <MdVisibility />
        <span>{post.viewCount}</span>
        {likes ? (
          <div onClick={() => handleLikes()}>
            <MdThumbUp />
          </div>
        ) : (
          <div onClick={() => handleLikes()}>
            <MdThumbUpOffAlt />
          </div>
        )}
        <span>{post.likeCount}</span>
        <MdVisibility />
        <span>{post.commentCount}</span>
      </div>
    </>
  );
};

export default Post;
