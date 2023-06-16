import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('components/Button', () => {
  it('should render', () => {
    const text = 'Click me!';

    render(<Button onClick={jest.fn()}>{text}</Button>);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent(text);
  });
});
