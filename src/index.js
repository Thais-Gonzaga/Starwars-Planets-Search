// capsular App pelo provider
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StarWarsProvider from './context/StarWarsProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <StarWarsProvider>
      <App />
    </StarWarsProvider>,
  );
