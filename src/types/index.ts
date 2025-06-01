export type Links = {
  label: string;
  href: string;
};

export type Cuisines = {
  label: string;
  value: string;
};
export type Recipe = {
  id: number;
  title: string;
  image: string;
  imageType: string;
};

export type Measure = {
  amount: number;
  unitLong: string;
  unitShort: string;
};

export type Ingredient = {
  aisle: string;
  amount: number;
  consistency: string;
  id: number;
  image: string;
  measures: {
    metric: Measure;
    us: Measure;
  };
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
};

export type RecipeDetail = {
  title: string;
  image: string;
  extendedIngredients: Ingredient[];
};
