import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react-native';

import App from './App';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect((!tree || Array.isArray(tree) ? null : tree)?.children?.length).toBe(
      1,
    );
  });

  it('contains "One plus two equals 3."', () => {
    render(<App />);
    expect(screen.getByText('One plus two equals 3.')).toBeTruthy();
  });
});
