import * as types from "./constants";

export type Url = {
  _id: string;
  name: string;
  slug: string;
  url: string;
  opens: string[];
  isListed: boolean;
};

export type State = {
  data?: Url[];
};

export type Actions = {
  type: typeof types.SAVE_LINK_REQUEST;
};
