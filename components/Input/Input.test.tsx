/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

import Input from './Input';

test('renders an input', () => {
  const props: { id: string; label: string; error?: string } = {
    id: 'input-id',
    label: 'test',
  };
  render(<Input {...props} />);

  const input = screen.getByLabelText(props.label);
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('id', props.id);
});

test('renders an error message only if one exists', () => {
  const props: { id: string; label: string; error?: string } = {
    id: 'input-id',
    label: 'test',
  };
  const { rerender } = render(<Input {...props} />);

  const error = screen.queryByRole('alert');
  expect(error).toBeNull();

  props.error = 'error message';
  rerender(<Input {...props} />);

  const errorMessage = screen.getByRole('alert');
  expect(errorMessage).toHaveTextContent(props.error);
});
