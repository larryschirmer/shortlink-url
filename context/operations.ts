import { Dispatch } from 'react';
import axios from 'axios';

import * as actions from './actions';
import { Actions, Url, SaveLink } from './types';
import { handle } from '@utils/index';

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

const instance = axios.create({ baseURL: domain });

export const login =
  ({ user, password }: { user: string; password: string }) =>
  async (dispatch: Dispatch<Actions>) => {
    dispatch(actions.loginRequest());

    try {
      await instance.post('/auth', { user, password }, { withCredentials: true });
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
    const { data: newLink } = await instance.post<Url>('/url', link, { withCredentials: true });
    dispatch(actions.createLinkSuccess(newLink));
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
    const { data: updatedLink } = await instance.put<Url>(`/url`, link, { withCredentials: true });
    dispatch(actions.updateLinkSuccess(updatedLink));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(actions.updateLinkFailure(handle.axiosError(error)));
    } else {
      dispatch(actions.updateLinkFailure(handle.unexpectedError(error)));
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
