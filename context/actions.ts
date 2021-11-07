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

// Application State

export const selectLinkAction = (linkId: string): Actions => ({
  type: types.SELECT_LINK,
  payload: linkId,
});

export const createLinkAction = (): Actions => ({
  type: types.CREATE_LINK,
});

export const resetLinkAction = (): Actions => ({
  type: types.RESET_LINK,
});

export const toggleDeleteModeAction = (): Actions => ({
  type: types.TOGGLE_DELETE_MODE,
});
