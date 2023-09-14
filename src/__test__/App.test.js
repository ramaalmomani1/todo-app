import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Header from '../Components/Header/Header';
import  Footer  from '../Components/Footer/Footer';


test('renders Home and Settings links', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Header />
      <Footer />
    </MemoryRouter>
  );

  const homeLink = getByText('Home');
  const settingsLink = getByText('Settings');

  expect(homeLink).toBeInTheDocument();
  expect(settingsLink).toBeInTheDocument();
});

test('Settings link has the correct data-testid attribute', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  const settingsLink = getByTestId('go-settings');

  expect(settingsLink).toBeInTheDocument();
});


  it('should render the login componentss', () => {
    render(<Footer />);

    const copyrightText = screen.getByText('© 2023 ToDo');
    expect(copyrightText).toBeInTheDocument();
  });




 
