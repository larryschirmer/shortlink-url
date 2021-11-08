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
  saveSuccess: false,
  error: null,
};

const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    // REQUEST
    case constants.LOGIN_REQUEST:
    case constants.GET_LINKS_REQUEST:
    case constants.CREATE_LINK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // SUCCESS
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
    case constants.CREATE_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: {
          list: [...(state.data.list || []), action.payload],
          tagGroups: sortLinks([...(state.data.list || []), action.payload]),
        },
        saveSuccess: true,
      };
    // FAILURE
    case constants.LOGIN_FAILURE:
    case constants.GET_LINKS_FAILURE:
    case constants.CREATE_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // APPLICATION STATE
    case constants.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
      }
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
        saveSuccess: false,
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
