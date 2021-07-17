import { Dispatch } from "react";
import { saveLinkRequest } from "./actions";
import { Actions } from "./types";

type SaveLink = {
  _id?: string;
  slug: string;
  url: string;
  isListed: boolean;
};
export const saveLink =
  ({ _id, slug, url, isListed }: SaveLink) =>
  (dispatch: Dispatch<Actions>) => {
    dispatch(saveLinkRequest());
  };
