export interface Project {
  id: string;
  title: string;
  short_description: string;
  bullet_points: string[] | null;
  icon_url: string | null;
  category: string;
  date: string | null;
  skills: string[] | null;
  link_url: string | null;
  display_order: number;
  created_at: string;
}
