import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../App.css';
import { increment, newCryptoPageVisible, removeFromWatchList, decrement } from '../counterSlice';
import Header from './Header';

function CryptoList() {
    const list = useSelector((state) => state.counter.list);
    const addedList = useSelector((state) => state.counter.addedList);
    const dispatch = useDispatch();
    let int;

    function loadApiData() {
        fetch('https://data.messari.io/api/v1/assets')
        .then(response  => response.json())
        .then(
          (result) => {
              const addList = [];
              result.data.forEach(element => {
                  if (addedList.includes(element.name.toLowerCase()) || addedList.includes(element.symbol.toLowerCase())) {
                      addList.push(element);
                  }
              });
              dispatch(increment(addList));
          },
          (error) => {
              console.log("error", error);
          })
    }

    function addInterval() {
        loadApiData();
        int = setInterval(function () {
            loadApiData();
        }, 4000);
    }

    function updateList(el) {
           dispatch(decrement(el));
           dispatch(removeFromWatchList(el));
           loadApiData();
       }

    useEffect(() => {
        addInterval();
        return () => clearInterval(int);
      }, [addedList])
    
  return (
    <div>
        <Header />
        <div className="crypto-list">
       {
          list.map(el => {
              return (
              <div key={el.id} className="crypto-card">
                  <img alt="icon" className="crypto-photo" src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=013" />
                <div className="crypto-name">
                  {el.name} 
                <br />
                  <span className="symbol">{el.symbol}</span>
                </div>
                <div className="crypto-amount">
                  ${el.metrics.market_data.price_usd < 1 ? el.metrics.market_data.price_usd.toFixed(6) : el.metrics.market_data.price_usd.toFixed(2)} 
                <br />
              {el.metrics.market_data.percent_change_usd_last_24_hours < 1 ? 
              <span className={el.metrics.market_data.percent_change_usd_last_24_hours < 0 ? "red" : "green"}>
                  {el.metrics.market_data.percent_change_usd_last_24_hours < 0 ? <span className="material-icons font-set">south_west</span> : <span className="material-icons font-set">north_east</span>}
                  {el.metrics.market_data.percent_change_usd_last_24_hours.toFixed(4)}</span> : 
              <span className={el.metrics.market_data.percent_change_usd_last_24_hours < 0 ? "red" : "green"}>
                  {el.metrics.market_data.percent_change_usd_last_24_hours < 0 ? <span className="material-icons font-set">south_west</span> : <span className="material-icons font-set">north_east</span>}
                  {el.metrics.market_data.percent_change_usd_last_24_hours.toFixed(2)} %</span>}
                </div>
                   <span className="close">
                   <button className="remove-button-prop" onClick={() => updateList(el)}> <span className="material-icons font-set">clear</span> </button>
                   </span>
              </div>)
          })
      }
      <div className="add-crypto-button-container">
          <button className="remove-button-prop add-crypto-button" onClick={() => dispatch(newCryptoPageVisible())}>+ Add a Cryptocurrency</button>
      </div>
    </div>
    </div>
  );
}

export default CryptoList;
