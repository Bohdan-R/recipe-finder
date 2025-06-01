import { Recipe } from '@/types';
import { Card } from '@/components/Card';

type RecipeResponse = {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
};

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: { query?: string; cuisine?: string; maxReadyTime?: string };
}) {
  const { query = '', cuisine = '', maxReadyTime = '' } = searchParams;

  const API_KEY = process.env.SPOONACULAR_API_KEY;

  if (!API_KEY) {
    return (
      <div className="p-6 text-center text-red-500">Error: API key is missing. Please contact the administrator.</div>
    );
  }

  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (cuisine) params.append('cuisine', cuisine);
  if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);
  params.append('apiKey', API_KEY);

  const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;

  let data: RecipeResponse | null = null;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Unauthorized: Invalid API key');
      } else if (res.status === 429) {
        throw new Error('Too Many Requests: API limit exceeded');
      } else {
        throw new Error(`Failed to fetch recipes: ${res.status} ${res.statusText}`);
      }
    }

    data = await res.json();

    if (!data?.results || !Array.isArray(data.results)) {
      throw new Error('Invalid response format from API');
    }
  } catch (err) {
    console.error('Error fetching recipes:', err);
    return (
      <div className="p-6 text-center text-red-500">
        {err instanceof Error
          ? `Failed to load recipes: ${err.message}`
          : 'Failed to load recipes. Please try again later.'}
      </div>
    );
  }

  if (!data.results || data.results.length === 0) {
    return <div className="p-6 text-center text-gray-500">No recipes found for your search.</div>;
  }

  return (
    <div className="max-w-[1400px] mx-auto p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {data.results.map(recipe => (
        <Card key={recipe.id} id={recipe.id} image={recipe.image} title={recipe.title} />
      ))}
    </div>
  );
}
