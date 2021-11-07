import { State, Actions } from './types';
import * as constants from './constants';

import { sortLinks } from '@utils/index';

export const initialState: State = {
  data: {},
  loading: false,
  isLoggedIn: false,
  selectedLink: '',
  createLink: false,
  deleteMode: false,
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
      };
    case constants.CREATE_LINK:
      return {
        ...state,
        selectedLink: '',
        deleteMode: false,
        createLink: true,
      };
    case constants.RESET_LINK:
      return {
        ...state,
        selectedLink: '',
        createLink: false,
      };
    case constants.TOGGLE_DELETE_MODE:
      return {
        ...state,
        deleteMode: !state.deleteMode,
        selectedLink: '',
        createLink: false,
      };
    default:
      return state;
  }
};

export default reducer;
