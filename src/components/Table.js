import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { responseApi: { results }, contex:
    { filterName, filterNumber } } = useContext(StarWarsContext);
  if (!results) return;
  const titles = results.map((data) => Object.keys(data))[0]
    .filter((e) => e !== 'residents');

  const filters = results.filter(({ name }) => name.includes(filterName))
    .filter((data) => {
      const filterNum = [];
      filterNumber.forEach(({ column, comparison, value }) => {
        if (comparison === 'maior que') {
          const bool = +data[column] > +value;
          filterNum.push(bool);
        }
        if (comparison === 'menor que') {
          const bool = +data[column] < +value;
          filterNum.push(bool);
        }
        if (comparison === 'igual a') {
          const bool = +data[column] === +value;
          filterNum.push(bool);
        }
      });
      return filterNum.every((allTrue) => allTrue);
    });

  return (
    <table>
      <thead>
        <tr>
          {titles.map((title) => (
            <th key={ title }>
              { title }
            </th>))}
        </tr>
      </thead>
      <tbody>
        {filters
          .map((data) => (
            <tr key={ data.name }>
              {titles.map((title) => (
                <td
                  key={ data[title] }
                  data-testid={ title === 'name' ? 'planet-name' : '' }
                >
                  {data[title]}
                </td>
              ))}
            </tr>
          ))}
      </tbody>

    </table>
  );
}

export default Table;
