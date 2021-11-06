import { State, Actions } from './types';
import * as constants from './constants';

import { sortLinks } from '@utils/index';

export const initialState: State = {
  data: {},
  loading: false,
  isLoggedIn: false,
  selectedLink: '',
  error: null,
};

const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
    case constants.GET_LINKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        isLoggedIn: true,
      };
    case constants.GET_LINKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: {
          list: action.payload,
          tagGroups: sortLinks(action.payload),
        },
      };
    case constants.LOGIN_FAILURE:
    case constants.GET_LINKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case constants.SELECT_LINK:
      return {
        ...state,
        selectedLink: action.payload,
      }
    default:
      return state;
  }
};

export default reducer;
