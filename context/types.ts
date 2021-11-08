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
  createLink: boolean;
  deleteMode: boolean;
  saveSuccess: boolean;
  error?: string | null;
};

// Opperations

export type SaveLink = {
  name?: string;
  slug?: string;
  url: string;
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

type CreateLink =
  | {
      type: typeof types.CREATE_LINK_REQUEST;
    }
  | {
      type: typeof types.CREATE_LINK_SUCCESS;
      payload: Url;
    }
  | {
      type: typeof types.CREATE_LINK_FAILURE;
      payload: string;
    };

type ModifyLink =
  | {
      type: typeof types.UPDATE_LINK_REQUEST;
    }
  | {
      type: typeof types.UPDATE_LINK_SUCCESS;
      payload: Url;
    }
  | {
      type: typeof types.UPDATE_LINK_FAILURE;
      payload: string;
    };

type DeleteLink =
  | {
      type: typeof types.DELETE_LINK_REQUEST;
    }
  | {
      type: typeof types.DELETE_LINK_SUCCESS;
      payload: string;
    }
  | {
      type: typeof types.DELETE_LINK_FAILURE;
      payload: string;
    };

type ApplicationState =
  | {
      type: typeof types.SET_LOGGED_IN;
    }
  | {
      type: typeof types.SELECT_LINK;
      payload: string;
    }
  | {
      type: typeof types.CREATE_LINK;
    }
  | {
      type: typeof types.RESET_LINK;
    }
  | {
      type: typeof types.TOGGLE_DELETE_MODE;
    };

export type Actions = Login | GetLinks | CreateLink | ModifyLink | DeleteLink | ApplicationState;
