import { useState } from "react";

function Register({ onLogin, goToLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          onLogin(data.token);
        } else {
          setError(Object.values(data.errors || {}).flat().join(" "));
        }
      });
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-green-400">Inscription</h1>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Nom"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="bg-gray-800 rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="bg-gray-800 rounded px-3 py-2"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="bg-gray-800 rounded px-3 py-2"
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={form.password_confirmation}
            onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
            className="bg-gray-800 rounded px-3 py-2"
          />
          <button type="submit" className="bg-green-500 hover:bg-green-400 rounded px-4 py-2 font-bold">
            S'inscrire
          </button>
        </form>
        <p className="mt-4 text-gray-400 text-sm text-center">
          Déjà un compte ?{" "}
          <span onClick={goToLogin} className="text-green-400 cursor-pointer hover:underline">
            Se connecter
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;