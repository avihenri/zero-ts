import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopNavBar from './TopNavBar';
import { RecoilRoot } from 'recoil';

describe('TopNavBar Component', () => {
  test('renders the navigation bar', () => {
    render(
        <RecoilRoot>
            <TopNavBar />
        </RecoilRoot>
    );
    
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toBeInTheDocument();
  });

  test('renders the menu icon', () => {
    render(
        <RecoilRoot>
            <TopNavBar />
        </RecoilRoot>
    );
    
    const menuIcon = screen.getByTestId('menu-icon');
    expect(menuIcon).toBeInTheDocument();
  });

  test('renders the user icon', () => {
    render(
        <RecoilRoot>
            <TopNavBar />
        </RecoilRoot>
    );
    
    const userIcon = screen.getByTestId('user-icon');
    expect(userIcon).toBeInTheDocument();
  });

  test('renders the brand logo', () => {
    render(
        <RecoilRoot>
            <TopNavBar />
        </RecoilRoot>
    );
    
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });
});
