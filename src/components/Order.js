import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const options1 = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function Order() {
  const { contex: { selectOrder, setSelectOrder } } = useContext(StarWarsContext);
  const { order: { column } } = selectOrder;
  const [selectLocalOrder, setSelectLocalOrder] = useState(selectOrder);
  return (
    <div>
      <label htmlFor="column-sort">
        Ordenar:
        <select
          id="column-sort"
          value={ column }
          data-testid="column-sort"
          onChange={
            ({ target }) => setSelectLocalOrder((current) => (
              ({ order: { ...current.order, column: target.value } })))
          }
        >
          {options1.map((col) => <option key={ col }>{col}</option>)}
        </select>
      </label>

      <label htmlFor="column-sort-input-asc">
        Ordem Ascedente:
        <input
          id="column-sort-input-asc"
          data-testid="column-sort-input-asc"
          type="radio"
          name="order"
          value="ASC"
          onChange={
            ({ target }) => setSelectLocalOrder((current) => (
              ({ order: { ...current.order, sort: target.value } })))
          }
        />
      </label>
      <label htmlFor="column-sort-input-desc">
        Ordem Decrescente:
        <input
          id="column-sort-input-desc"
          data-testid="column-sort-input-desc"
          type="radio"
          name="order"
          value="DESC"
          onChange={
            ({ target }) => setSelectLocalOrder((current) => (
              ({ order: { ...current.order, sort: target.value } })))
          }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => {
          setSelectOrder({ ...selectLocalOrder });
        } }
      >
        Ordenar
      </button>
    </div>
  );
}

export default Order;
