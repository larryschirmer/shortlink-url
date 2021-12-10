/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import AccordianList from './AccordianList';

test('renders title', async () => {
  const title = 'List Title';
  const list = [<></>, <></>];
  render(<AccordianList {...{ title, list }} />);

  expect(screen.getByText(title)).toBeInTheDocument();
});

test('callbacks are triggered on click', async () => {
  const title = 'List Title';
  const list = [<></>, <></>];
  const handleHeaderOpen = jest.fn();
  const handleHeaderClose = jest.fn();
  render(
    <AccordianList {...{ title, list, handleHeaderOpen, handleHeaderClose }} />,
  );

  user.click(screen.getByText(title));
  user.click(screen.getByText(title));

  expect(handleHeaderOpen).toHaveBeenCalledTimes(1);
  expect(handleHeaderClose).toHaveBeenCalledTimes(1);
});
