import * as types from './constants';
import { Actions, Url } from './types';

// Login

export const loginRequest = (): Actions => ({
  type: types.LOGIN_REQUEST,
});

export const loginSuccess = (): Actions => ({
  type: types.LOGIN_SUCCESS,
});

export const loginFailure = (error: string): Actions => ({
  type: types.LOGIN_FAILURE,
  payload: error,
});

// Get Links

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
