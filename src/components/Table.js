import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { values:
    { filterName,
      responseApi: { results },
    } } = useContext(StarWarsContext);
  if (!results) return;
  const titles = results.map((data) => Object.keys(data))[0]
    .filter((e) => e !== 'residents');

  const nameFilter = results.filter(({ name }) => name.includes(filterName));

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
        {nameFilter
          .map((data) => (
            <tr key={ data.name }>
              {titles.map((title) => (
                <td key={ data[title] }>
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
