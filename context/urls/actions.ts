import * as types from "./constants";
import { Actions } from "./types";

export const saveLinkRequest = (): Actions => ({
  type: types.SAVE_LINK_REQUEST,
});
