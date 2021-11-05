import { Dispatch } from 'react';
import axios from 'axios';

import * as actions from './actions';
import { Actions, Url } from './types';
import { handleAxiosError, handleUnexpectedError } from '../../utils/error';

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

export const getLinks = () => async (dispatch: Dispatch<Actions>) => {
  dispatch(actions.getLinksRequest());

  try {
    const { data } = await axios({ baseURL: domain, url: '/url', method: 'GET' });
    const links: Url[] = data;

    dispatch(actions.getLinksSuccess(links));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(actions.getLinksFailure(handleAxiosError(error)));
    } else {
      dispatch(actions.getLinksFailure(handleUnexpectedError(error)));
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
