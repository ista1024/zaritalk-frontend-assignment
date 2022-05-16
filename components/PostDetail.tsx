import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";

import { postData } from "../types/communityType";

// MdThumbUp: 좋아요 색, MdThumbUpOffAlt: 좋아요 테두리
import { MdThumbUp, MdThumbUpOffAlt } from "react-icons/md";
// BsChatDotsFill: 댓글 색, BsChatDots: 댓글 테두리
import { BsChatDotsFill, BsChatDots } from "react-icons/bs";
import { compareDate } from "../utils/util";

interface postProps {
  data: postData;
}

const PostDetail: NextPage<postProps> = ({ data }: postProps) => {
  // viewCount 반영을 위한 api 통신
  /* 코드예제
   * const result = await axios.post(
   *   `/api/community/post/viewCount/${post.pk}`,
   *   {
   *     postPk: post.pk,
   *     viewer: viewer | null,
   *   }
   * );
   */

  const [post, setPost] = useState<postData>(data);

  // 좋아요 눌렀는지 확인 및 카운트 변경
  const [likes, setLikes] = useState<boolean>(false);
  const [likesCount, setLlkesCount] = useState<number>(data.likeCount);
  // 댓글 표시 여부
  const [isCommentShow, setIsCommentShow] = useState<boolean>(false);

  // 좋아요 핸들링
  const handleLikes = () => {
    setLikes(!likes);
    likes ? setLlkesCount(likesCount - 1) : setLlkesCount(likesCount + 1);
    // 실제로 api를 통해 좋아요 여부를 서버와 통신해야 함
    /* 코드예시
     * const result = await axios.post(
     *   `/api/community/post/like/${post.pk}`,
     *   {
     *     postPk: post.pk,
     *     isLike: !likes
     *   }
     * );
     * if (result.data.isSuccess) {
     *   setLikes(!likes);
     *   likes ? setLlkesCount(likesCount - 1) : setLlkesCount(likesCount + 1);
     * }
     */
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
      const link = `<a class="underline decoration-sky-500" href=${match[0]}>${match[0]}</a>`;
      return text.replace(match[0], link);
    } else {
      return text;
    }
  };

  (() => {
    createLinkFromText(post.content);
  })();

  return (
    <div className={"flex flex-col  w-full mb-1 py-4 bg-white "}>
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
        <div className="my-2 w-full h-full relative">
          <Image
            src={imgSrc(post.imageUrl)}
            width="100%"
            height="100%"
            layout="responsive"
            alt="post"
            objectFit="contain"
          />
        </div>
      ) : null}
      <div className="flex text-gray-500  align-center">
        <div
          className="flex bg-gray-100 mx-2 p-1 pl-2 rounded-lg"
          onClick={() => handleLikes()}
        >
          {likes ? (
            <MdThumbUp className="self-center" />
          ) : (
            <MdThumbUpOffAlt className="self-center" />
          )}
          <span className="mx-2">{likesCount}</span>
        </div>
        <div
          className="flex bg-gray-100 mx-2  p-1 pl-2 rounded-lg"
          onClick={() => setIsCommentShow((isCommentShow) => !isCommentShow)}
        >
          {isCommentShow ? (
            <BsChatDotsFill className="self-center" />
          ) : (
            <BsChatDots className="self-center" />
          )}
          <span className="mx-2">{post.commentCount}</span>
        </div>
      </div>
      <div>
        {isCommentShow
          ? post.commentCount > 0
            ? [...Array(post.commentCount)].map((_, index) => (
                <div
                  key={`comment ${index}`}
                  className="flex justify-between my-2"
                >
                  <div className="flex self-center mx-2">
                    <span className="text-gray-500">댓글작성자_{index}</span>
                    <span className="text-gray-500 mx-2">댓글 {index}</span>
                  </div>
                </div>
              ))
            : null
          : null}
      </div>
    </div>
  );
};

export default PostDetail;
