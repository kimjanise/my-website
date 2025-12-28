export interface Person {
  id: string;
  name: string;
  name_url: string | null;
  role: string | null;
  description: string;
  link_prefix: string | null;
  link_text: string | null;
  link_suffix: string | null;
  link_url: string | null;
  display_order: number;
  created_at: string;
}
