import { types, flow, IMSTArray } from 'mobx-state-tree';
import axios, { AxiosResponse } from 'axios';

import { handle, getCookie, sortLinks } from '@utils/index';

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

const yearInMilliseconds = 1000 * 60 * 60 * 24 * 365;
const newToken = (token: string) =>
  `token=${token}; expires=${new Date(
    Date.now() + yearInMilliseconds,
  )}; path=/`;

export type Url = {
  _id: string;
  name: string;
  slug: string;
  url: string;
  isListed: boolean;
  tags: string[];
  opens: string[];
};

const UrlModel = types.model({
  _id: types.string,
  name: types.string,
  slug: types.string,
  url: types.string,
  isListed: types.boolean,
  tags: types.array(types.string),
  opens: types.array(types.string),
});

const Server = types
  .model({
    data: types.optional(types.array(UrlModel), []),
    isLoggedIn: types.boolean,
    loading: types.boolean,
    saveSuccess: types.boolean,
    isValidSlug: types.maybeNull(types.boolean),
    error: types.maybeNull(types.string),
  })
  .actions(self => ({
    setIsLoggedIn(isLoggedIn: boolean) {
      self.isLoggedIn = isLoggedIn;
    },
    resetIsValidSlug() {
      self.isValidSlug = null;
    },
    resetLinkState() {
      self.saveSuccess = false;
      self.isValidSlug = null;
      self.error = null;
    },
    login: flow(function* ({
      name,
      password,
    }: {
      name: string;
      password: string;
    }) {
      self.loading = true;

      const url = `${domain}/auth`;
      const data = { name, password };

      try {
        const {
          data: { token },
        } = yield axios.post(url, data);
        document.cookie = newToken(token);
        self.isLoggedIn = true;
      } catch (error) {
        self.error = handle.axiosError(error);
      } finally {
        self.loading = false;
      }
    }),
    getLinks: flow(function* () {
      self.loading = true;

      try {
        const cookie = getCookie(document.cookie, 'token');
        const url = `${domain}/slug`;
        const config = cookie
          ? {
              headers: {
                Authorization: `Bearer ${cookie}`,
              },
            }
          : {};
        const { data } = yield axios.get(url, config);
        self.data = data;
      } catch (error) {
        self.error = handle.axiosError(error);
      } finally {
        self.loading = false;
      }
    }),
    isSlugValid: flow(function* (slug: string) {
      self.loading = true;

      try {
        const url = `${domain}/slug/isValid?slug=${slug}`;
        const { data } = yield axios.get(url);
        self.isValidSlug = data.isValid;
      } catch (error) {
        self.error = handle.axiosError(error);
      } finally {
        self.loading = false;
      }
    }),
    createLink: flow(function* (linkParams: {
      name?: string;
      slug?: string;
      url: string;
      isListed?: boolean;
    }) {
      self.loading = true;

      try {
        const cookie = getCookie(document.cookie, 'token');
        const url = `${domain}/slug`;
        if (!cookie) return;
        const config = {
          headers: {
            Authorization: `Bearer ${cookie}`,
            'Content-Type': 'application/json',
          },
        };
        const { data } = yield axios.post(url, linkParams, config);
        self.data.push(data);
        self.saveSuccess = true;
      } catch (error) {
        self.error = handle.axiosError(error);
      } finally {
        self.loading = false;
      }
    }),
    updateLink: flow(function* (
      linkId: string,
      linkParams: {
        name?: string;
        slug?: string;
        url?: string;
        isListed?: boolean;
      },
    ) {
      self.loading = true;

      try {
        const cookie = getCookie(document.cookie, 'token');
        const url = `${domain}/slug/${linkId}`;
        if (!cookie) return;
        const config = {
          headers: {
            Authorization: `Bearer ${cookie}`,
            'Content-Type': 'application/json',
          },
        };
        const { data }: AxiosResponse<Url> = yield axios.put(
          url,
          linkParams,
          config,
        );
        const updated = self.data.map(link =>
          link._id === data._id ? data : link,
        );
        self.data = updated as IMSTArray<typeof UrlModel>;
        self.saveSuccess = true;
      } catch (error) {
        self.error = handle.axiosError(error);
      } finally {
        self.loading = false;
      }
    }),
    deleteLink: flow(function* (linkId: string) {
      self.loading = true;

      try {
        const cookie = getCookie(document.cookie, 'token');
        const url = `${domain}/slug/${linkId}`;
        if (!cookie) return;
        const config = {
          headers: {
            Authorization: `Bearer ${cookie}`,
            'Content-Type': 'application/json',
          },
        };
        yield axios.delete(url, config);
        const updated = self.data.filter(link => link._id !== linkId);
        self.data = updated as IMSTArray<typeof UrlModel>;
        self.saveSuccess = true;
      } catch (error) {
        self.error = handle.axiosError(error);
      } finally {
        self.loading = false;
      }
    }),
  }))
  .views(self => ({
    get tagGroups() {
      return sortLinks(self.data, self.isLoggedIn);
    },
  }));

export default Server;
