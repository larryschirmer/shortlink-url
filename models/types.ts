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
};

export type TagLink = { tag: string; links: Url[] };
