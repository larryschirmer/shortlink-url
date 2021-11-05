import * as types from './constants';
import { Actions, Url } from './types';

export const getLinksRequest = (): Actions => ({
  type: types.GET_LINKS_REQUEST,
});

export const getLinksSuccess = (links: Url[]): Actions => ({
  type: types.GET_LINKS_SUCCESS,
  payload: links,
});

export const getLinksFailure = (error: string): Actions => ({
  type: types.GET_LINKS_FAILURE,
  payload: error,
});

// export const saveLinkRequest = (): Actions => ({
//   type: types.SAVE_LINK_REQUEST,
// });
