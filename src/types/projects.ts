export interface Project {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  icon_url: string | null;
  category: string;
  link_url: string | null;
  link_text: string | null;
  tags: string[] | null;
  display_order: number;
  created_at: string;
}
