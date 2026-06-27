import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from 'lightweight-charts';

function StockChart({ stockId, symbol }) {
  const chartRef = useRef(null);

  useEffect(() => {
  const chart = createChart(chartRef.current, {
    layout: {
      background: { color: "#111827" },
      textColor: "#9ca3af",
    },
    grid: {
      vertLines: { color: "#1f2937" },
      horzLines: { color: "#1f2937" },
    },
    width: chartRef.current.clientWidth,
    height: 200,
  });

  const candleSeries = chart.addSeries(CandlestickSeries, {
    upColor: "#22c55e",
    downColor: "#ef4444",
    borderUpColor: "#22c55e",
    borderDownColor: "#ef4444",
    wickUpColor: "#22c55e",
    wickDownColor: "#ef4444",
  });

  fetch(`http://localhost:8000/api/stocks/${stockId}/prices`)
    .then(res => res.json())
    .then(data => {
      const formatted = data
        .filter(d => d.open && d.high && d.low && d.price)
        .map(d => ({
          time: d.date,
          open: parseFloat(d.open),
          high: parseFloat(d.high),
          low: parseFloat(d.low),
          close: parseFloat(d.price),
        }));

      candleSeries.setData(formatted);
      chart.timeScale().fitContent();
    });

  return () => chart.remove();
}, [stockId]);

  return (
    <div className="bg-gray-900 rounded p-4">
      <h2 className="text-lg font-bold mb-3 text-green-400">{symbol}</h2>
      <div ref={chartRef} />
    </div>
  );
}

export default StockChart;