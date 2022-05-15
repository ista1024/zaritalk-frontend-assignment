import type { NextPage } from "next";
import { categoryData } from "../types/communityType";
import { useState, useRef } from "react";

interface categoryProps {
  categories: categoryData[];
  handleCategoryFilter: (idx: number) => void;
  categoryFilter: number;
}

interface categoryButtonProps {
  category: categoryData | null;
  handleCategoryFilter: (idx: number) => void;
  categoryFilter: number;
  key: string;
  filterIdx: number;
}

// 커뮤니티 카테고리 버튼 컴포넌트
const CategoryButton: NextPage<categoryButtonProps> = ({
  category,
  handleCategoryFilter,
  categoryFilter,
  filterIdx,
}: categoryButtonProps) => {
  return (
    <button
      onClick={() => handleCategoryFilter(filterIdx)}
      className={`${
        categoryFilter === filterIdx
          ? "bg-blue-500  text-white border-blue-500"
          : "bg-transparent border-grey-500"
      } hover:bg-blue-700 border hover:text-white font-bold py-2 px-4 mx-1 rounded-full`}
    >
      {filterIdx === -1
        ? "전체"
        : filterIdx === 0
        ? "인기글"
        : category?.categoryName}
    </button>
  );
};

// 커뮤니티 카테고리 래퍼 컴포넌트
const Category: NextPage<categoryProps> = ({
  categories,
  handleCategoryFilter,
  categoryFilter,
}: categoryProps) => {
  // drag시 이동할 위치를 저장하는 변수
  const [posX, setPosX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [styles, setStyles] = useState({ left: 0 });

  const dragRef = useRef<HTMLDivElement>(null);

  const dragStart = (e: any) => {
    setIsDragging(true);
    if (posX === 0) {
      setPosX(e.clientX);
    } else {
      setPosX(e.clientX - styles.left);
    }
  };

  const dragging = (e: any) => {
    if (isDragging) {
      const maxX = -300;
      const leftX = e.clientX - posX;
      if (leftX < 0 && leftX > maxX) {
        setStyles({ left: leftX });
      }
    }
  };

  const dragEnd = (e: any) => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  return (
    <div className="flex" style={{ width: "720px" }}>
      <div
        className="relative"
        onMouseDown={dragStart}
        onMouseMove={dragging}
        onMouseUp={dragEnd}
        onMouseLeave={dragEnd}
        style={styles}
        ref={dragRef}
      >
        <CategoryButton
          category={null}
          categoryFilter={categoryFilter}
          filterIdx={-1}
          key={`category -1`}
          handleCategoryFilter={handleCategoryFilter}
        />
        <CategoryButton
          category={null}
          categoryFilter={categoryFilter}
          filterIdx={0}
          key={`category 0`}
          handleCategoryFilter={handleCategoryFilter}
        />
        {categories.map((category) => (
          <CategoryButton
            category={category}
            categoryFilter={categoryFilter}
            filterIdx={category.categoryPk}
            key={`category ${category.categoryPk}`}
            handleCategoryFilter={handleCategoryFilter}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
