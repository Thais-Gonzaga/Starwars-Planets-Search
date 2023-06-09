import React from 'react';
import { cleanup, getByTestId, render, screen } from '@testing-library/react';
import App from '../App';
// import mockFetch from '../../cypress/mocks/fetch'
import testData from '../../cypress/mocks/testData'
import StarWarsProvider from '../context/StarWarsProvider';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';


const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(testData)
    }));
}

const values ={
  inputName: 'oo',
  inputValue: '200001',
}

describe('verifica o funcionamento da aplicação', () => {
  it('Realize uma requisição para a API', async () => {
    mockFetch()
    await act(async () => {
      render(
        <StarWarsProvider>
      <App />
      </StarWarsProvider>
      );
    });
    expect(global.fetch).toHaveBeenCalled();
    const columnOrder = screen.getByTestId('column-sort');
    const sortOrder = screen.getByTestId('column-sort-input-asc');
    const sortOrderdesc = screen.getByTestId('column-sort-input-desc');
    const bntOrder = screen.getByTestId('column-sort-button');
    
    expect(columnOrder).toBeInTheDocument();
    expect(sortOrder).toBeInTheDocument(); 
    expect(sortOrderdesc).toBeInTheDocument(); 
    expect(bntOrder).toBeInTheDocument();

    userEvent.selectOptions(columnOrder, 'diameter');
    userEvent.click(sortOrder)
    userEvent.click(bntOrder)

    userEvent.selectOptions(columnOrder, 'orbital_period');
    userEvent.click(sortOrderdesc)
    userEvent.click(bntOrder)
    
    userEvent.selectOptions(columnOrder, 'population');
    userEvent.click(sortOrderdesc)
    userEvent.click(bntOrder)

    
    const nameFilter = screen.getByTestId('name-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const bntFilter = screen.getByTestId('button-filter');
    // const tatooine = await screen.findByText(/tatooine/i);
    // const naboo = await screen.findByText(/naboo/i);

    expect(nameFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument(); 
    expect(bntFilter).toBeInTheDocument();

    userEvent.type(nameFilter, values.inputName);

    // expect(tatooine).toBeInTheDocument();
    // expect(naboo).toBeInTheDocument();
    
    userEvent.type(valueFilter, values.inputValue);
    userEvent.click(bntFilter);
    

    // expect(tatooine).not.toBeInTheDocument();
    // expect(naboo).toBeInTheDocument();
    
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