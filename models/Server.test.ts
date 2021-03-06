/**
 * @jest-environment jsdom
 */

import axios, { AxiosError } from 'axios';

import Server from './Server';

const error: AxiosError = {
  config: {},
  request: {},
  response: {
    data: {
      message: 'error message',
    },
    status: 500,
    statusText: 'error',
    headers: {},
    config: {},
  },
  isAxiosError: true,
  toJSON: () => ({
    message: 'error',
  }),
  name: 'error',
  message: 'error',
};

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

const ServerModel = {
  data: [],
  user: null,
  isLoggedIn: false,
  loading: false,
  saveSuccess: false,
  isValidSlug: null,
  error: null,
};

it('should create instance of Server', () => {
  const server = Server.create(ServerModel);
  expect(server).toBeTruthy();
});

it('should set logged in property', () => {
  const server = Server.create(ServerModel);
  expect(server.isLoggedIn).toBe(false);
  server.setIsLoggedIn(true);
  expect(server.isLoggedIn).toBe(true);
});

it('should reset link save state', () => {
  const server = Server.create({
    ...ServerModel,
    saveSuccess: true,
    isValidSlug: true,
    error: 'error',
  });

  server.resetLinkState();
  expect(server.saveSuccess).toBe(false);
  expect(server.isValidSlug).toBe(null);
  expect(server.error).toBe(null);
});

describe('login', () => {
  it('should login', async () => {
    const server = Server.create(ServerModel);

    const response = {
      headers: {
        token: 'token',
      },
    };

    jest
      .spyOn(axios, 'post')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(response)));

    const fields = { name: 'name', password: 'password' };
    await server.login(fields);
    expect(axios.post).toHaveBeenCalledWith(`${domain}/auth`, fields);
    expect(server.isLoggedIn).toBe(true);
  });

  it('should return error', async () => {
    const server = Server.create(ServerModel);

    jest
      .spyOn(axios, 'post')
      .mockImplementationOnce(jest.fn(() => Promise.reject(error)));

    const url = `${domain}/auth`;
    const fields = { name: 'name', password: 'password' };
    await server.login(fields);
    expect(axios.post).toHaveBeenCalledWith(url, fields);
    expect(server.error).toBe('error message');
  });
});

describe('getUser', () => {
  it('should get a users name and isAdmin from token', async () => {
    const server = Server.create(ServerModel);

    const token = 'abc123';
    document.cookie = `token=${token}`;

    const response = {
      data: {
        name: 'name',
        isAdmin: true,
      },
      headers: {
        token: 'token',
      },
    };

    jest
      .spyOn(axios, 'get')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(response)));

    await server.getUser();
    const headers = { Authorization: `Bearer ${token}` };
    expect(axios.get).toHaveBeenCalledWith(`${domain}/auth`, { headers });
    expect(server.user).toEqual({
      name: 'name',
      isAdmin: true,
    });
    expect(server.isLoggedIn).toBe(true);
  });
});

describe('getLinks', () => {
  const response = {
    data: [
      {
        _id: '61be2b2e003d33d6c33f5f8b',
        name: 'Youtube #social #video #educational #fun',
        slug: 'youtube',
        url: 'https://youtube.com',
        isListed: true,
        isFavorite: false,
        tags: ['#social', '#video', '#educational', '#fun'],
        opens: [],
        openAmt: 0,
      },
    ],
    headers: {
      token: 'token',
    },
  };

  it('should get an array of links', async () => {
    const server = Server.create(ServerModel);

    document.cookie = 'token=';

    jest
      .spyOn(axios, 'get')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(response)));

    await server.getLinks();
    const url = `${domain}/slug`;
    const headers = {};
    expect(axios.get).toHaveBeenCalledWith(url, headers);
    expect(server.data).toEqual(response.data);
  });

  it('should use cookie as token in header', async () => {
    const server = Server.create(ServerModel);

    const token = 'abc123';
    document.cookie = `token=${token}`;

    jest
      .spyOn(axios, 'get')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(response)));

    await server.getLinks();
    const url = `${domain}/slug`;
    const headers = { Authorization: `Bearer ${token}` };
    expect(axios.get).toHaveBeenCalledWith(url, { headers });
    expect(server.data).toEqual(response.data);
  });
});

describe('isSlugValid', () => {
  it('should return a check if slug is in use', async () => {
    const server = Server.create(ServerModel);

    const response = {
      data: {
        isValid: true,
      },
    };

    jest
      .spyOn(axios, 'get')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(response)));

    const slug = 'slug';
    await server.isSlugValid(slug);
    const url = `${domain}/slug/isValid?slug=${slug}`;
    expect(axios.get).toHaveBeenCalledWith(url);
    expect(server.isValidSlug).toBe(true);
  });
});

describe('createLink', () => {
  const response = {
    data: {
      _id: '61be2b2e003d33d6c33f5f8b',
      name: 'Youtube #fun #video',
      slug: 'youtube',
      url: 'https://youtube.com',
      isListed: true,
      isFavorite: false,
      tags: ['#fun', '#video'],
      opens: [],
      openAmt: 0,
    },
    headers: {
      token: 'token',
    },
  };

  it('should append the created link to data', async () => {
    const server = Server.create(ServerModel);
    jest
      .spyOn(axios, 'post')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(response)));

    const token = 'abc123';
    document.cookie = `token=${token}`;

    const fields = {
      name: 'Youtube #fun #video',
      url: 'https://youtube.com',
      slug: 'youtube',
      isListed: true,
    };
    await server.createLink(fields);
    const url = `${domain}/slug`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    expect(axios.post).toHaveBeenCalledWith(url, fields, { headers });
    expect(server.data).toEqual([response.data]);
  });

  it('should generate tag groups from tags', async () => {
    const server = Server.create(ServerModel);
    jest
      .spyOn(axios, 'post')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(response)));

    const token = 'abc123';
    document.cookie = `token=${token}`;

    const fields = {
      name: 'Youtube #fun #video',
      url: 'https://youtube.com',
      slug: 'youtube',
      isListed: true,
    };
    await server.createLink(fields);

    expect(server.tagGroups).toEqual([
      { tag: '#fun', links: [response.data] },
      { tag: '#video', links: [response.data] },
      { tag: 'All Links', links: [response.data] },
    ]);
  });
});

describe('updateLink', () => {
  const links = [
    {
      _id: 'abc123',
      name: 'Untitled',
      slug: 'kjf63',
      url: 'https://google.com',
      isListed: false,
      isFavorite: false,
      tags: [],
      opens: [],
      openAmt: 0,
    },
    {
      _id: '61be2b2e003d33d6c33f5f8b',
      name: 'Youtube #fun #video',
      slug: 'youtube',
      url: 'https://youtube.com',
      isListed: true,
      isFavorite: false,
      tags: ['#fun', '#video'],
      opens: [],
      openAmt: 0,
    },
  ];

  const response = {
    data: {
      _id: '61be2b2e003d33d6c33f5f8b',
      name: 'Youtube',
      slug: 'youtube',
      url: 'https://youtube.com',
      isListed: false,
      isFavorite: false,
      tags: [],
      opens: [],
      openAmt: 0,
    },
    headers: {
      token: 'token',
    },
  };

  it('should update an existing link', async () => {
    const server = Server.create({ ...ServerModel, data: links });

    jest
      .spyOn(axios, 'put')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(response)));

    const token = 'abc123';
    document.cookie = `token=${token}`;

    const fields = {
      name: 'Youtube',
      url: 'https://youtube.com',
      slug: 'youtube',
      isListed: true,
    };

    const linkId = '61be2b2e003d33d6c33f5f8b';
    await server.updateLink(linkId, fields);
    const url = `${domain}/slug/61be2b2e003d33d6c33f5f8b`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    expect(axios.put).toHaveBeenCalledWith(url, fields, { headers });
    expect(server.data).toEqual([links[0], response.data]);
  });
});

describe('deleteLink', () => {
  const links = [
    {
      _id: 'abc123',
      name: 'Untitled',
      slug: 'kjf63',
      url: 'https://google.com',
      isListed: false,
      isFavorite: false,
      tags: [],
      opens: [],
      openAmt: 0,
    },
    {
      _id: '61be2b2e003d33d6c33f5f8b',
      name: 'Youtube #fun #video',
      slug: 'youtube',
      url: 'https://youtube.com',
      isListed: true,
      isFavorite: false,
      tags: ['#fun', '#video'],
      opens: [],
      openAmt: 0,
    },
  ];

  const response = {
    headers: {
      token: 'token',
    },
  };

  it('should delete a given link', async () => {
    const server = Server.create({ ...ServerModel, data: links });
    jest
      .spyOn(axios, 'delete')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(response)));

    const token = 'abc123';
    document.cookie = `token=${token}`;

    const linkId = '61be2b2e003d33d6c33f5f8b';
    await server.deleteLink(linkId);
    const url = `${domain}/slug/${linkId}`;
    const headers = { Authorization: `Bearer ${token}` };
    expect(axios.delete).toHaveBeenCalledWith(url, { headers });
    expect(server.data).toEqual([links[0]]);
  });
});
