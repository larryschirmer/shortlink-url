import { createContext, useContext, Dispatch, useCallback } from 'react';

import { State, Actions } from './types';

export { default as reducer, initialState } from './reducer';

export const StateContext = createContext(undefined as any);
StateContext.displayName = 'State';

export const Provider = StateContext.Provider;

export type Context = {
  state: State;
  dispatch: Dispatch<Actions>;
};

const useStateContext = () => {
  const { state, dispatch } = useContext<Context>(StateContext);

  if (!state)
    console.warn(
      'context is undefined, pleace verify parent has implemented Provider',
    );

  type Opperation = (dispatch: Dispatch<Actions>) => Promise<void>;
  const dispatcher = useCallback(
    (fnc: Opperation) => fnc(dispatch),
    [dispatch],
  );

  return { state, dispatch: dispatcher };
};

export default useStateContext;
