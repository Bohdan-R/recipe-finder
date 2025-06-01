'use client';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Cuisines } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const cuisines: Cuisines[] = [
  { label: 'African', value: 'African' },
  { label: 'Asian', value: 'Asian' },
  { label: 'American', value: 'American' },
  { label: 'British', value: 'British' },
  { label: 'Cajun', value: 'Cajun' },
  { label: 'Caribbean', value: 'Caribbean' },
  { label: 'Chinese', value: 'Chinese' },
  { label: 'Eastern European', value: 'Eastern European' },
  { label: 'European', value: 'European' },
  { label: 'French', value: 'French' },
  { label: 'German', value: 'German' },
  { label: 'Greek', value: 'Greek' },
  { label: 'Indian', value: 'Indian' },
  { label: 'Irish', value: 'Irish' },
  { label: 'Italian', value: 'Italian' },
  { label: 'Japanese', value: 'Japanese' },
  { label: 'Jewish', value: 'Jewish' },
  { label: 'Korean', value: 'Korean' },
  { label: 'Latin American', value: 'Latin American' },
  { label: 'Mediterranean', value: 'Mediterranean' },
  { label: 'Mexican', value: 'Mexican' },
  { label: 'Middle Eastern', value: 'Middle Eastern' },
  { label: 'Nordic', value: 'Nordic' },
  { label: 'Southern', value: 'Southern' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'Thai', value: 'Thai' },
  { label: 'Vietnamese', value: 'Vietnamese' },
];

export default function HomePage() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxTime, setMaxTime] = useState('');

  const isValid = query || cuisine || maxTime;

  const handleNext = () => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (cuisine) params.append('cuisine', cuisine);
    if (maxTime) params.append('maxReadyTime', maxTime);
    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow rounded-2xl p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Recipe Finder</h1>

        <Input type="text" placeholder="Search recipe..." value={query} onChange={e => setQuery(e.target.value)} />
        <Input
          type="number"
          placeholder="Max preparation time (min)"
          value={maxTime}
          onChange={e => setMaxTime(e.target.value)}
          min={1}
        />
        <Select
          value={cuisine}
          options={cuisines}
          onChange={e => setCuisine(e.target.value)}
          placeholder="Choose cuisine..."
        />

        <Button onClick={handleNext} disabled={!isValid}>
          Next
        </Button>
      </div>
    </div>
  );
}
