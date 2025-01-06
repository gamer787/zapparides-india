import { motion } from 'framer-motion';
import { categories } from '../../data/faq-categories';
import type { CategoryId } from '../../data/faq-categories';

interface FAQCategoriesProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (category: CategoryId | 'all') => void;
}

export function FAQCategories({ selectedCategory, onSelectCategory }: FAQCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <CategoryButton
        isSelected={selectedCategory === 'all'}
        onClick={() => onSelectCategory('all')}
      >
        All Questions
      </CategoryButton>
      
      {categories.map(({ id, label, icon: Icon }) => (
        <CategoryButton
          key={id}
          isSelected={selectedCategory === id}
          onClick={() => onSelectCategory(id)}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </CategoryButton>
      ))}
    </div>
  );
}

interface CategoryButtonProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

function CategoryButton({ children, isSelected, onClick }: CategoryButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full flex items-center
        transition-colors duration-200
        ${isSelected
          ? 'bg-cyan-500 text-black font-semibold'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }
      `}
    >
      {children}
    </motion.button>
  );
}