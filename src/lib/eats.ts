import { supabase } from './supabase';
import type { Place, EatsCategory } from '@/types/eats';

// Fetch all places
export async function getPlaces(): Promise<Place[]> {
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching places:', error);
    throw new Error('Failed to fetch places');
  }

  return data || [];
}

// Fetch places by category
export async function getPlacesByCategory(category: EatsCategory): Promise<Place[]> {
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('category', category)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching places by category:', error);
    throw new Error('Failed to fetch places');
  }

  return data || [];
}
