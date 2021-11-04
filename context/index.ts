import { createContext, useContext, Dispatch } from "react";

import { State, Actions } from "./urls/types";

export const StateContext = createContext(undefined as any);
StateContext.displayName = "State";

export const Provider = StateContext.Provider;

export type Context = {
  state: State;
  dispatch: Dispatch<Actions>;
};

function useStateContext() {
  const state = useContext<Context>(StateContext);

  if (!state)
    console.warn(
      "context is undefined, pleace verify parent has implemented Provider"
    );

  return state;
}

export default useStateContext;
