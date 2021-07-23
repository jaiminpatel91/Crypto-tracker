import '../App.css';
import { useDispatch } from 'react-redux';
import { newCryptoPageDisable, addInWatchList } from '../counterSlice';
import { useState } from 'react';

function AddCrypto() {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    function addInList() {
        dispatch(addInWatchList(value.toLowerCase())); 
        dispatch(newCryptoPageDisable());
    }
  return (
    <div className="crypto-list add-crypto-page">
      <button className="remove-button-prop add-crypto-button" onClick={() => dispatch(newCryptoPageDisable())}>
      <span className="material-icons font-set">arrow_back_ios</span> Back to list
      </button>
      <div className="add-container">
      <h4> Add a Cryptocurrency</h4>
      <input type="text" className="input-add-crypto" value={value} 
      onChange={e => setValue(e.target.value)} placeholder="Use a name or ticker symbol..." />
      <br />
      <button className="add-button" disabled={value.length < 1 ? true : false} onClick={() => addInList()}>Add</button>
      </div>
    </div>
  );
}

export default AddCrypto;
