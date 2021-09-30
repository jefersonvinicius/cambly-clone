import { render } from '@testing-library/react';
import Input from '.';

describe('<Input />', () => {
  it('should render label provided', () => {
    const { getByText } = render(<Input label="Email" />);
    expect(getByText('Email')).toBeInTheDocument();
  });

  it('should render the right icon when provided', () => {
    const { getByTestId } = render(<Input rightIcon={<span data-testid="dummy-icon">Dummy</span>} />);
    expect(getByTestId('dummy-icon')).toBeInTheDocument();
  });
});
