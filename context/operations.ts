import { Dispatch } from 'react';
import axios from 'axios';
import omit from 'lodash/omit';

import * as actions from './actions';
import { Actions, Url, SaveLink, AuthedURL } from './types';
import { handle, getCookie } from '@utils/index';

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

const instance = axios.create({ baseURL: domain });

const newToken = (token: string) =>
  `token=${token}; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24)}; path=/`;

export const login =
  ({ user, password }: { user: string; password: string }) =>
  async (dispatch: Dispatch<Actions>) => {
    dispatch(actions.loginRequest());

    try {
      const {
        data: { token },
      } = await instance.post<{ token: string }>('/auth', {
        user,
        password,
      });
      document.cookie = newToken(token);
      dispatch(actions.loginSuccess());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(actions.loginFailure(handle.axiosError(error)));
      } else {
        dispatch(actions.loginFailure(handle.unexpectedError(error)));
      }
    }
  };

export const getLinks = () => async (dispatch: Dispatch<Actions>) => {
  dispatch(actions.getLinksRequest());

  try {
    const { data: links } = await instance.get<Url[]>('/url');
    dispatch(actions.getLinksSuccess(links));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(actions.getLinksFailure(handle.axiosError(error)));
    } else {
      dispatch(actions.getLinksFailure(handle.unexpectedError(error)));
    }
  }
};

export const saveLink = (link: SaveLink) => async (dispatch: Dispatch<Actions>) => {
  dispatch(actions.createLinkRequest());

  try {
    const token = getCookie(document.cookie, 'token');
    const { data } = await instance.post<AuthedURL>('/url', { ...link, token });
    document.cookie = newToken(data.token);
    dispatch(actions.createLinkSuccess(omit(data, ['token'])));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(actions.createLinkFailure(handle.axiosError(error)));
    } else {
      dispatch(actions.createLinkFailure(handle.unexpectedError(error)));
    }
  }
};

export const updateLink = (link: SaveLink) => async (dispatch: Dispatch<Actions>) => {
  dispatch(actions.updateLinkRequest());

  try {
    const token = getCookie(document.cookie, 'token');
    const { data } = await instance.put<AuthedURL>(`/url`, { ...link, token });
    document.cookie = newToken(data.token);
    dispatch(actions.updateLinkSuccess(omit(data, ['token'])));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(actions.updateLinkFailure(handle.axiosError(error)));
    } else {
      dispatch(actions.updateLinkFailure(handle.unexpectedError(error)));
    }
  }
};

export const deleteLink = (id: string) => async (dispatch: Dispatch<Actions>) => {
  dispatch(actions.deleteLinkRequest());

  try {
    const token = getCookie(document.cookie, 'token');
    const { data } = await instance.delete<{ token: string }>(`/url`, { data: { _id: id, token } });
    document.cookie = newToken(data.token);
    dispatch(actions.deleteLinkSuccess(id));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(actions.deleteLinkFailure(handle.axiosError(error)));
    } else {
      dispatch(actions.deleteLinkFailure(handle.unexpectedError(error)));
    }
  }
};

export const setLoggedIn = () => async (dispatch: Dispatch<Actions>) => {
  dispatch(actions.setLoggedInAction());
};

export const selectLink = (linkId: string) => async (dispatch: Dispatch<Actions>) => {
  dispatch(actions.selectLinkAction(linkId));
};

export const createLink = () => async (dispatch: Dispatch<Actions>) => {
  dispatch(actions.createLinkAction());
};

export const resetLink = () => async (dispatch: Dispatch<Actions>) => {
  dispatch(actions.resetLinkAction());
};

export const toggleDeleteMode = () => async (dispatch: Dispatch<Actions>) => {
  dispatch(actions.toggleDeleteModeAction());
};
