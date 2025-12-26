export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  created_at: string;
}
