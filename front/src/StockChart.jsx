import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

function StockChart({ stockId, symbol }) {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/stocks/${stockId}/prices`)
      .then(res => res.json())
      .then(data => setPrices(data));
  }, [stockId]);

  return (
    <div className="bg-gray-900 rounded p-4 mt-4">
      <h2 className="text-lg font-bold mb-4 text-green-400">{symbol}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={prices}>
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#22c55e" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;