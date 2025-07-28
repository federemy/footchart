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

function ComparePage() {
  const { t } = useTranslation();
  const [selectedLeague, setSelectedLeague] = useState(39); // Premier por defecto
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const fetchPlayer = async (query, setPlayer, setLoading) => {
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
      const foundPlayer = response.data.response.find((p) =>
        p.player.name.toLowerCase().includes(query.toLowerCase())
      );
      setPlayer(foundPlayer);
    } catch (err) {
      console.error("❌ Error al buscar jugador:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t("compare.title")}
      </h1>

      {/* Selector de liga */}
      <div className="mb-4 text-center">
        <label className="font-semibold mr-2">{t("compare.league")}:</label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Player 1 */}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchPlayer(search1, setPlayer1, setLoading1);
            }}
            className="flex gap-2 mb-4"
          >
            <input
              type="text"
              placeholder={t("compare.search1")}
              value={search1}
              onChange={(e) => setSearch1(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-3 py-2 rounded-lg"
            >
              {t("compare.button")}
            </button>
          </form>

          {loading1 && <p>{t("compare.loading1")}</p>}
          {player1 && (
            <div className="border rounded-lg p-4 text-center bg-white dark:bg-gray-800">
              <img
                src={player1.player.photo}
                alt={player1.player.name}
                className="w-20 h-20 mx-auto rounded-full mb-2"
              />
              <h2 className="font-bold">{player1.player.name}</h2>
              <p>{player1.statistics[0]?.team.name ?? t("compare.noTeam")}</p>
              <p>⚽ {t("compare.goals")}: {player1.statistics[0]?.goals.total ?? 0}</p>
              <p>🎯 {t("compare.assists")}: {player1.statistics[0]?.goals.assists ?? 0}</p>
            </div>
          )}
        </div>

        {/* Player 2 */}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchPlayer(search2, setPlayer2, setLoading2);
            }}
            className="flex gap-2 mb-4"
          >
            <input
              type="text"
              placeholder={t("compare.search2")}
              value={search2}
              onChange={(e) => setSearch2(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-3 py-2 rounded-lg"
            >
              {t("compare.button")}
            </button>
          </form>

          {loading2 && <p>{t("compare.loading2")}</p>}
          {player2 && (
            <div className="border rounded-lg p-4 text-center bg-white dark:bg-gray-800">
              <img
                src={player2.player.photo}
                alt={player2.player.name}
                className="w-20 h-20 mx-auto rounded-full mb-2"
              />
              <h2 className="font-bold">{player2.player.name}</h2>
              <p>{player2.statistics[0]?.team.name ?? t("compare.noTeam")}</p>
              <p>⚽ {t("compare.goals")}: {player2.statistics[0]?.goals.total ?? 0}</p>
              <p>🎯 {t("compare.assists")}: {player2.statistics[0]?.goals.assists ?? 0}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComparePage;
