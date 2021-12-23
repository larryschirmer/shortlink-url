import { Instance, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import App from './App';
import Server from './Server';

const RootModel = types.model({
  app: App,
  server: Server,
});

export const rootStore = RootModel.create({
  app: {
    selectedLink: '',
    createMode: false,
    deleteMode: false,
  },
  server: {
    data: [],
    user: null,
    isLoggedIn: false,
    loading: false,
    saveSuccess: false,
    isValidSlug: null,
    error: null,
  },
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
