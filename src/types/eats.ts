export type LocationTag = 'nyc' | 'sf' | 'pittsburgh' | 'other';
export type EatsCategory = 'restaurants' | 'bakeries' | 'coffee + tea' | 'bars';

export interface Place {
  id: string;
  name: string;
  website?: string;
  location: LocationTag;
  favorites: string;
  category: EatsCategory;
  created_at: string;
}
