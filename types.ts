
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: Category;
  imageUrl: string;
  readTime: string;
}

export enum Category {
  TECHNOLOGY = 'Technology',
  LIFESTYLE = 'Lifestyle',
  DESIGN = 'Design',
  FUTURE = 'Future'
}

export interface NavItem {
  label: string;
  path: string;
}
