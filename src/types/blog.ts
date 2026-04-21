export interface BlogPost {
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  date: string;
  readTime: string;
  author: string;
  color: string;
  excerpt: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  outline: string[];
  content: {
    intro: string;
    sections: { heading: string; body: string }[];
    callout?: { title: string; body: string };
    conclusion: string;
  };
}
