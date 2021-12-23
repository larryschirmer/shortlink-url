/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Provider, rootStore, RootInstance } from '@models/index';
import LoginForm from './LoginForm';

test('LoginForm has no a11y violations', async () => {
  const handleSubmit = () => {};
  const handleClose = () => {};
  const { container } = render(
    <Provider value={rootStore}>
      <LoginForm {...{ handleSubmit, handleClose }} />
    </Provider>,
  );
  await waitFor(async () => {
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

test('should submit form data', async () => {
  const handleSubmit = jest.fn();
  const handleClose = () => {};
  render(
    <Provider value={rootStore}>
      <LoginForm {...{ handleSubmit, handleClose }} />
    </Provider>,
  );

  const formData = {
    name: 'name',
    password: 'password',
  };

  user.type(screen.getByLabelText(/name/i), formData.name);
  user.type(screen.getByLabelText(/password/i), formData.password);
  user.click(screen.getByText(/save/i));

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith(formData);
  });
});

test('should disable submit and render loading state', async () => {
  const handleSubmit = () => {};
  const handleClose = () => {};
  const providerValues: RootInstance = {
    ...rootStore,
    server: {
      ...rootStore.server,
      loading: true,
    },
  };
  render(
    <Provider value={providerValues}>
      <LoginForm {...{ handleSubmit, handleClose }} />
    </Provider>,
  );

  await waitFor(() => {
    expect(screen.getByText(/loading/i)).toBeDisabled();
  });
});

test('should handle close on close', async () => {
  const handleSubmit = () => {};
  const handleClose = jest.fn();
  render(
    <Provider value={rootStore}>
      <LoginForm {...{ handleSubmit, handleClose }} />
    </Provider>,
  );

  user.click(screen.getByText(/close/i));

  await waitFor(() => {
    expect(handleClose).toHaveBeenCalled();
  });
});
