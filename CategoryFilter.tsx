import React from 'react';
import { Category } from './types';

interface CategoryFilterProps {
  activeCategory: Category | 'all';
  onFilterChange: (category: Category | 'all') => void;
}

const categories: (Category | 'all')[] = ['all', Category.RESTAURANT, Category.RETAIL, Category.SERVICE];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onFilterChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-800 rounded-lg">
      {categories.map(category => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 ${
              isActive
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            {category === 'all' ? 'All Categories' : category}
          </button>
        );
      })}
    </div>
  );
};