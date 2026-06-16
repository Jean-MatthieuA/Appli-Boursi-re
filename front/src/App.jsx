import { useState, useEffect } from "react";

function App() {
  const [stocks, setStocks] = useState([]);
  const [form, setForm] = useState({
    symbol: "",
    name: "",
    buy_price: "",
    quantity: "",
  });

  useEffect(() => {
    fetchStocks();
  }, []);

  function fetchStocks() {
    fetch("http://localhost:8000/api/stocks")
      .then(res => res.json())
      .then(data => setStocks(data));
  }
  function fetchQuote(symbol) {
  if (!symbol) return;
  fetch(`http://localhost:8000/api/quote/${symbol}`)
    .then(res => res.json())
    .then(data => {
      const quote = data["Global Quote"];
      if (quote && quote["05. price"]) {
        setForm(f => ({
          ...f,
          buy_price: parseFloat(quote["05. price"]).toFixed(2),
        }));
      }
    });
}

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8000/api/stocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => {
        fetchStocks();
        setForm({ symbol: "", name: "", buy_price: "", quantity: "" });
      });
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Mon Portefeuille</h1>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
       <input
  name="symbol"
  value={form.symbol}
  onChange={handleChange}
  onBlur={e => fetchQuote(e.target.value)}
  placeholder="Symbole"
  className="bg-gray-800 rounded px-3 py-2 w-28"
/>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="bg-gray-800 rounded px-3 py-2 flex-1" />
        <input name="buy_price" value={form.buy_price} onChange={handleChange} placeholder="Prix" type="number" className="bg-gray-800 rounded px-3 py-2 w-28" />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantité" type="number" className="bg-gray-800 rounded px-3 py-2 w-28" />
        <button type="submit" className="bg-green-500 hover:bg-green-400 rounded px-4 py-2 font-bold">Ajouter</button>
      </form>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-800">
            <th className="pb-3">Symbole</th>
            <th className="pb-3">Nom</th>
            <th className="pb-3">Quantité</th>
            <th className="pb-3">Prix d'achat</th>
            <th className="pb-3">Total investi</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.id} className="border-b border-gray-800 hover:bg-gray-900">
              <td className="py-4 font-mono font-bold text-green-400">{stock.symbol}</td>
              <td className="py-4">{stock.name}</td>
              <td className="py-4">{stock.quantity}</td>
              <td className="py-4">{stock.buy_price} €</td>
              <td className="py-4">{(stock.buy_price * stock.quantity).toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default App;