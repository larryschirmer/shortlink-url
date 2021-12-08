/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Provider } from '@context/index';
import { State } from '@context/types';
import LoginForm from './LoginForm';

test('LoginForm has no a11y violations', async () => {
  const handleSubmit = () => {};
  const handleClose = () => {};
  const dispatch = () => {};
  const { container } = render(
    <Provider value={{ state: {}, dispatch }}>
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
  const dispatch = () => {};
  render(
    <Provider value={{ state: {}, dispatch }}>
      <LoginForm {...{ handleSubmit, handleClose }} />
    </Provider>,
  );

  const formData = {
    user: 'name',
    password: 'password',
  };

  user.type(screen.getByLabelText(/name/i), formData.user);
  user.type(screen.getByLabelText(/password/i), formData.password);
  user.click(screen.getByText(/save/i));

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith(formData);
  });
});

test('should disable submit and render loading state', async () => {
  const handleSubmit = () => {};
  const handleClose = () => {};
  const dispatch = () => {};
  const providerValues: { state: Partial<State>; dispatch: () => void } = {
    state: { loading: true },
    dispatch,
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
  const dispatch = () => {};
  render(
    <Provider value={{ state: {}, dispatch }}>
      <LoginForm {...{ handleSubmit, handleClose }} />
    </Provider>,
  );

  user.click(screen.getByText(/close/i));

  await waitFor(() => {
    expect(handleClose).toHaveBeenCalled();
  });
})