import { Dispatch } from 'react';
import axios from 'axios';

import * as actions from './actions';
import { Actions, Url } from './types';
import { handle } from '@utils/index';

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

const instance = axios.create({ baseURL: domain });

export const login =
  ({ user, password }: { user: string; password: string }) =>
  async (dispatch: Dispatch<Actions>) => {
    dispatch(actions.loginRequest());

    try {
      await instance.post('/auth', { user, password });
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
    const { data } = await instance.get('/url');
    const links: Url[] = data;

    dispatch(actions.getLinksSuccess(links));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(actions.getLinksFailure(handle.axiosError(error)));
    } else {
      dispatch(actions.getLinksFailure(handle.unexpectedError(error)));
    }
  }
};

// export const saveLink =
//   ({ _id, slug, url, isListed }: SaveLink) =>
//   (dispatch: Dispatch<Actions>) => {
//     dispatch(saveLinkRequest());
//   };

//   export const updateLink =
//   ({ _id, slug, url, isListed }: SaveLink) =>
//   (dispatch: Dispatch<Actions>) => {
//     dispatch(saveLinkRequest());
//   };
