
function PortfolioSelector({ portfolios, activePortfolio, onSelect, onAddClick }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {portfolios.length > 1 && (
        <select
          value={activePortfolio?.id || ""}
          onChange={e => {
            const p = portfolios.find(p => p.id === parseInt(e.target.value));
            onSelect(p);
          }}
          className="bg-gray-800 text-white rounded px-3 py-2"
        >
          {portfolios.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      )}

      <button
        onClick={onAddClick}
        className="bg-green-600 hover:bg-green-500 rounded px-4 py-2 text-sm font-bold"
      >
        + Ajouter un portfolio
      </button>
    </div>
  );
}

export default PortfolioSelector;