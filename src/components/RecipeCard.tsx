import { Ingredient } from '@/types';
import Image from 'next/image';

type RecipeCardProps = {
  title: string;
  image: string;
  ingredients: Ingredient[];
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ title, image, ingredients }) => {
  return (
    <div className="rounded shadow hover:shadow-md transition bg-white overflow-hidden max-w-md mx-auto">
      <Image
        src={image || '/food-fallback.jpg'}
        alt={title}
        width={400}
        height={400}
        className="w-full h-[400px] object-cover"
        priority={false}
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Ingredients</h3>
          <ul className="list-disc pl-5 space-y-1">
            {ingredients.map((ingredient, i) => (
              <li key={`${ingredient.id}-${ingredient.name}-${i}`} className="text-gray-600">
                {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
