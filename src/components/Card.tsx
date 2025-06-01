import Link from 'next/link';
import Image from 'next/image';
import { Recipe } from '@/types';

type CardRecipe = Omit<Recipe, 'imageType'>;

export const Card: React.FC<CardRecipe> = ({ id, title, image }) => {
  return (
    <Link href={`/recipes/${id}`} className="rounded shadow hover:shadow-md transition block bg-white overflow-hidden">
      <Image
        src={image || '/food-fallback.jpg'}
        alt={title}
        width={400}
        height={400}
        className="w-full h-[400px] object-cover"
        priority={false}
      />
      <div className="p-4 font-medium text-gray-800">{title}</div>
    </Link>
  );
};
