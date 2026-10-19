export type User = {
  id: string,
  username: string,
  email:string,
  isActive: boolean,
  createdAt: string,
  updatedAt: string,
};

export type Idea = {
  id: string;
  authorId: number;
  title: string;
  description: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  reviewsCount: number;
  avgRating: number;
};
