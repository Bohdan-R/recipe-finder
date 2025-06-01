import { RecipeDetail } from '@/types';
import { RecipeCard } from '@/components/RecipeCard';

export default async function RecipeDetailsPage({ params }: { params: { id: string } }) {
  const API_KEY = process.env.SPOONACULAR_API_KEY;

  if (!API_KEY) {
    return (
      <div className="max-w-[1400px] mx-auto p-6 text-center text-red-500">
        Error: API key is missing. Please contact the administrator.
      </div>
    );
  }

  const url = `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${API_KEY}`;

  let data: RecipeDetail | null = null;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Unauthorized: Invalid API key');
      } else if (res.status === 429) {
        throw new Error('Too Many Requests: API limit exceeded');
      } else {
        throw new Error(`Failed to fetch recipe: ${res.status} ${res.statusText}`);
      }
    }
    data = await res.json();
  } catch (err) {
    return (
      <div className="max-w-[1400px] mx-auto p-6 text-center text-red-500">
        {err instanceof Error
          ? `Failed to load recipe: ${err.message}`
          : 'Failed to load recipe. Please try again later.'}
      </div>
    );
  }

  if (!data) {
    return <div className="max-w-[1400px] mx-auto p-6 text-center text-gray-500">No recipe data found.</div>;
  }

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      <RecipeCard key={data.title} title={data.title} image={data.image} ingredients={data.extendedIngredients} />
    </div>
  );
}
