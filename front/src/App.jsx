import { useState, useEffect } from "react";

function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/stocks")
      .then(res => res.json())
      .then(data => setStocks(data));
  }, []);

  return (
    <div>
      <h1>Mon Portefeuille</h1>
      <ul>
        {stocks.map(stock => (
          <li key={stock.id}>
            {stock.symbol} — {stock.name} — {stock.quantity} actions à {stock.buy_price}€
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;