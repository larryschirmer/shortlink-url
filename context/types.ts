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
    tagGroups?: TagLink[];
  };
  loading: boolean;
  isLoggedIn: boolean;
  selectedLink: string;
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

type Login =
  | {
      type: typeof types.LOGIN_REQUEST;
    }
  | {
      type: typeof types.LOGIN_SUCCESS;
    }
  | {
      type: typeof types.LOGIN_FAILURE;
      payload: string;
    };

type GetLinks =
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

type ApplicationState = {
  type: typeof types.SELECT_LINK;
  payload: string;
};

export type Actions = Login | GetLinks | ApplicationState;
