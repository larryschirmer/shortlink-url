export type SaveLink = {
  name?: string;
  slug?: string;
  url: string;
  isListed?: boolean;
};

export type Url = {
  _id: string;
  name: string;
  slug: string;
  url: string;
  isListed: boolean;
  tags: string[];
  opens: string[];
  isFavorite: boolean;
  description?: string;
};

export type User = {
  name: string;
  isAdmin: boolean;
};

export type TagLink = { tag: string; links: Url[] };
