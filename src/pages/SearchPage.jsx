import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Ligas disponibles
const leagues = [
  { id: 39, name: "Premier League" },
  { id: 140, name: "La Liga" },
  { id: 135, name: "Serie A" },
  { id: 78, name: "Bundesliga" },
  { id: 61, name: "Ligue 1" }
];

function SearchPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [selectedLeague, setSelectedLeague] = useState(39); // Premier League por defecto
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      setLoading(true);
      const response = await axios.get(
        "https://v3.football.api-sports.io/players/topscorers",
        {
          params: { league: selectedLeague, season: "2023" },
          headers: {
            "x-apisports-key": import.meta.env.VITE_API_KEY
          }
        }
      );
      const filtered = response.data.response.filter((p) =>
        p.player.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } catch (err) {
      console.error("❌ Error al buscar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{t("search.title")}</h1>

      {/* Selector de liga */}
      <div className="mb-4 text-center">
        <label className="font-semibold mr-2">{t("search.league")}:</label>
        <select
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(parseInt(e.target.value))}
          className="border rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          {leagues.map((l) => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>
      </div>

      {/* Input de búsqueda */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder={t("search.placeholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          {t("search.button")}
        </button>
      </form>

      {loading && <p className="text-center">{t("search.loading")}</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((player) => (
          <li
            key={player.player.id}
            className="border rounded-lg p-4 flex gap-4 items-center bg-white dark:bg-gray-800"
          >
            <img
              src={player.player.photo}
              alt={player.player.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold">{player.player.name}</p>
              <p className="text-sm text-gray-500">
                {player.statistics[0]?.team.name ?? t("search.noTeam")}
              </p>
              <p className="text-sm text-gray-500">
                {t("search.position")}: {player.statistics[0]?.games.position ?? "N/A"}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {!loading && results.length === 0 && query && (
        <p className="text-center text-gray-500 mt-4">{t("search.noResults")}</p>
      )}
    </div>
  );
}

export default SearchPage;
