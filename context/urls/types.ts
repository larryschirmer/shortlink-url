import * as types from './constants';

// Reducer

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

export type State = {
  data: {
    list?: Url[];
    tags?: string[];
    groups?: TagLink[];
  };
  loading: boolean;
  error?: string | null;
};

// Opperations

type SaveLink = {
  name?: string;
  slug?: string;
  url?: string;
  isListed?: boolean;
};

type UpdateLink = {
  _id: string;
  name?: string;
  slug?: string;
  url?: string;
  isListed?: boolean;
};

// Actions

export type Actions =
  | {
      type: typeof types.GET_LINKS_REQUEST;
    }
  | {
      type: typeof types.GET_LINKS_SUCCESS;
      payload: Url[];
    }
  | {
      type: typeof types.GET_LINKS_FAILURE;
      payload: string;
    };
