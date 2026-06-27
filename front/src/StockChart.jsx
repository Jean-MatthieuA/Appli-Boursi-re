import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from 'lightweight-charts';

const PERIODS = [
  { label: "1M", months: 1 },
  { label: "3M", months: 3 },
  { label: "1A", months: 12 },
  { label: "5A", months: 60 },
];

function getFromDate(months) {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.toISOString().split("T")[0];
}

function StockChart({ stockId, symbol }) {
  const chartRef = useRef(null);
  const [period, setPeriod] = useState("1M");
  const [allData, setAllData] = useState([]);

  // Fetch une seule fois
  useEffect(() => {
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
        setAllData(formatted);
      });
  }, [stockId]);

  // Chart — re-render quand period ou data change
  useEffect(() => {
    if (!allData.length || !chartRef.current) return;

    const months = PERIODS.find(p => p.label === period).months;
    const fromDate = getFromDate(months);
    const filtered = allData.filter(d => d.time >= fromDate);

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

    candleSeries.setData(filtered);
    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [allData, period]);

  return (
    <div className="bg-gray-900 rounded p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-green-400">{symbol}</h2>
        <div className="flex gap-1">
          {PERIODS.map(p => (
            <button
              key={p.label}
              onClick={() => setPeriod(p.label)}
              className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                period === p.label
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-gray-400 hover:bg-gray-600"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartRef} />
    </div>
  );
}

export default StockChart;