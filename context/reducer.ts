import { State, Actions } from './types';
import * as constants from './constants';

import { sortLinks } from '@utils/index';

export const initialState: State = {
  data: {},
  loading: false,
  error: null,
};

const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case constants.GET_LINKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.GET_LINKS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          list: action.payload,
          tagGroups: sortLinks(action.payload),
        },
      };
    case constants.GET_LINKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
