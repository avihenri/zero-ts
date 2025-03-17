import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopNavBar from './TopNavBar';

describe('TopNavBar Component', () => {
  test('renders the navigation bar', () => {
    render(<TopNavBar />);
    
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toBeInTheDocument();
  });

  test('renders the menu icon', () => {
    render(<TopNavBar />);
    
    const menuIcon = screen.getByTestId('menu-icon');
    expect(menuIcon).toBeInTheDocument();
  });

  test('renders the user icon', () => {
    render(<TopNavBar />);
    
    const userIcon = screen.getByTestId('user-icon');
    expect(userIcon).toBeInTheDocument();
  });

  test('renders the brand logo', () => {
    render(<TopNavBar />);
    
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });
});
