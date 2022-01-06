import { Instance, types, getSnapshot } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import { autorun } from 'mobx';

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
    editMode: false,
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

process.env.NEXT_PUBLIC_VERCEL_ENV === 'development' &&
  (function () {
    autorun(() => {
      console.log({
        state: getSnapshot(rootStore),
        views: {
          app: {
            isMenuOpen: rootStore.app.isMenuOpen,
          },
          server: {
            tagGroups: rootStore.server.tagGroups,
          },
        },
      });
    });
  })();

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
