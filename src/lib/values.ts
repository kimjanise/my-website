import { supabase } from './supabase';
import type { Value } from '@/types/values';

export async function getValues(): Promise<Value[]> {
  const { data, error } = await supabase
    .from('values')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching values:', error);
    throw new Error('Failed to fetch values');
  }

  return data || [];
}
