import { supabase } from './supabase';
import type { Person } from '@/types/people';

export async function getPeople(): Promise<Person[]> {
  const { data, error } = await supabase
    .from('people')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching people:', error);
    throw new Error('Failed to fetch people');
  }

  return data || [];
}
