import { useState, useEffect } from "react";
import type { NextPage } from "next";

import { categoryData } from "../types/communityType";

interface categoryProps {
  data: categoryData[];
  handleCategoryFilter: (idx: number) => void;
  categoryFilter: number;
}

const Category: NextPage<categoryProps> = ({
  data,
  handleCategoryFilter,
  categoryFilter,
}: categoryProps) => {
  const [categories, setCategories] = useState<categoryData[]>(data);
  const [isButtonClicked, setIsButtonClicked] = useState<number>(0);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => handleCategoryFilter(-1)}
        className={`${
          categoryFilter === -1 ? "bg-blue-500" : "bg-transparent"
        } hover:bg-blue-700 border border-blue-500 hover:text-white font-bold py-2 px-4 rounded-full`}
      >
        전체
      </button>
      <button
        onClick={() => handleCategoryFilter(0)}
        className={`${
          categoryFilter === 0 ? "bg-blue-500" : "bg-transparent"
        } hover:bg-blue-700 border border-blue-500 hover:text-white font-bold py-2 px-4 rounded-full`}
      >
        인기
      </button>
      {categories.map((category, idx) => (
        <button
          key={`category ${category.categoryPk}`}
          onClick={() => handleCategoryFilter(category.categoryPk)}
          className={`${
            categoryFilter === category.categoryPk
              ? "bg-blue-500"
              : "bg-transparent"
          } hover:bg-blue-700 border border-blue-500 hover:text-white font-bold py-2 px-4 rounded-full`}
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  );
};

export default Category;
