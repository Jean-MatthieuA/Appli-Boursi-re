
import { useState } from "react";

function AddPortfolioModal({ token, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit() {
    if (!name.trim()) {
      setError("Le nom est requis");
      return;
    }

    fetch("http://localhost:8000/api/portfolios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          onCreated(data);
          onClose();
        } else {
          setError("Erreur lors de la création");
        }
      });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-green-400 mb-4">Nouveau portfolio</h2>
        {error && <p className="text-red-400 mb-3 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Nom du portfolio"
          value={name}
          onChange={e => setName(e.target.value)}
          className="bg-gray-800 rounded px-3 py-2 w-full mb-4 text-white"
        />
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 rounded px-4 py-2 text-sm"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-400 rounded px-4 py-2 text-sm font-bold"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPortfolioModal;