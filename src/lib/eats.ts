import { supabase } from './supabase';
import type { Place } from '@/types/eats';

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
