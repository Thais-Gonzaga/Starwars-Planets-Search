import React from 'react';
import { cleanup, getByTestId, render, screen } from '@testing-library/react';
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch'
import StarWarsProvider from '../context/StarWarsProvider';
import userEvent from '@testing-library/user-event';


const values ={
  inputName: 'oo',
  inputValue: '200001',
}

describe('verifica o funcionamento da aplicação', () => {
  beforeAll(mockFetch);
  beforeEach(cleanup);
  test('verifica o funcionamento aplicação', async () => {
    
      render(<StarWarsProvider>
        <App />
        </StarWarsProvider>);
    
    const nameFilter = screen.getByTestId('name-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const bntFilter = screen.getByTestId('button-filter');
    const tatooine = await screen.findByText(/tatooine/i);
    const naboo = await screen.findByText(/naboo/i);

    expect(nameFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument(); 
    expect(bntFilter).toBeInTheDocument();

    userEvent.type(nameFilter, values.inputName);

    expect(tatooine).toBeInTheDocument();
    expect(naboo).toBeInTheDocument();
    
    userEvent.type(valueFilter, values.inputValue);
    userEvent.click(bntFilter);
    

    expect(tatooine).not.toBeInTheDocument();
    expect(naboo).toBeInTheDocument();
    
    const bntDel = screen.getByText('X');
    const textFilter = screen.getByTestId('filter');
        
    expect(textFilter).toBeInTheDocument();
    expect(bntDel).toBeInTheDocument();

    userEvent.click(bntDel);

    expect(textFilter).not.toBeInTheDocument();
    
    userEvent.click(bntFilter);

    const textFilter1 = screen.getByTestId('filter');
    const bntRemove = screen.getByTestId('button-remove-filters')

    expect(textFilter1).toBeInTheDocument();
    expect(bntRemove).toBeInTheDocument();
    
    userEvent.click(bntRemove);
    
    const comparison = screen.getByTestId('comparison-filter');
    const column = screen.getByTestId('column-filter');
    
    expect(comparison).toBeInTheDocument()
    expect(column).toBeInTheDocument()

    userEvent.selectOptions(column, 'diameter');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.click(bntFilter);

    const text = screen.getByText('diameter menor que 0');
    
    expect(text).toBeInTheDocument();

    userEvent.selectOptions(comparison, 'igual a');
    userEvent.click(bntFilter);

    const text1 = screen.getByText('population igual a 0');
    
    expect(text1).toBeInTheDocument();
    

  });
});