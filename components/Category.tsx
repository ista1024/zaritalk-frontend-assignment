import type { NextPage } from "next";
import { categoryData } from "../types/communityType";

interface categoryProps {
  categories: categoryData[];
  handleCategoryFilter: (idx: number) => void;
  categoryFilter: number;
}

const Category: NextPage<categoryProps> = ({
  categories,
  handleCategoryFilter,
  categoryFilter,
}: categoryProps) => {
  return (
    <div className="flex w-full">
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
