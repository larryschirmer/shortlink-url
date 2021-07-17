import { createContext, useContext } from "react";

export const StateContext = createContext(undefined as any);
StateContext.displayName = "State";

export const Provider = StateContext.Provider;

const useStateContext = () => {
  const state = useContext(StateContext);

  if (!!state) console.warn("context is undefined, pleace verify parent has implemented Provider");

  return state;
};

export default useStateContext;
