import { supabase } from './supabase';
import type { Experience } from '@/types/experiences';

export async function getExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching experiences:', error);
    throw new Error('Failed to fetch experiences');
  }

  return data || [];
}
