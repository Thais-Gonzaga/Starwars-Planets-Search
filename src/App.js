import React from 'react';
import './App.css';
import FilterName from './components/FilterName';
import FilterNumber from './components/FilterNumber';
import Table from './components/Table';

function App() {
  return (
    <div>
      <FilterName />
      <FilterNumber />
      <Table />
    </div>
  );
}

export default App;
