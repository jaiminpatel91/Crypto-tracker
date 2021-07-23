import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import CryptoList from './components/CryptoList';
import AddCrypto from './components/AddCrypto';

function App() {
  const count = useSelector((state) => state.counter.newCryptoPage);
  return (
    <div className="App">
      <div className="App-header">
        {
          count ? <AddCrypto /> : 
          <CryptoList />
        }
      </div>
    </div>
  );
}

export default App;
