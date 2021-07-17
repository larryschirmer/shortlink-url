import { createContext, useContext, Dispatch } from "react";

export const StateContext = createContext(undefined as any);
StateContext.displayName = "State";

export const Provider = StateContext.Provider;

export type Context<State, Actions> = {
  state: State;
  dispatch: Dispatch<Actions>;
};

function useStateContext<StateType>() {
  const state = useContext<StateType>(StateContext);

  if (!state)
    console.warn(
      "context is undefined, pleace verify parent has implemented Provider"
    );

  return state;
}

export default useStateContext;
