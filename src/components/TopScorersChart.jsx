import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import axios from "axios";
import { useTranslation } from "react-i18next";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Ligas disponibles
const leagues = [
  { id: 39, name: "Premier League" },
  { id: 140, name: "La Liga" },
  { id: 135, name: "Serie A" },
  { id: 78, name: "Bundesliga" },
  { id: 61, name: "Ligue 1" }
];

function TopScorersChart() {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [season, setSeason] = useState(2023);
  const [league, setLeague] = useState(39); // Premier por defecto
  const [loading, setLoading] = useState(true);
  const [positionFilter, setPositionFilter] = useState("All");
  const [nationalityFilter, setNationalityFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (player) => {
    let updatedFavorites;
    if (favorites.find(fav => fav.player.id === player.player.id)) {
      updatedFavorites = favorites.filter(fav => fav.player.id !== player.player.id);
    } else {
      updatedFavorites = [...favorites, player];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const fetchData = async (selectedSeason, selectedLeague) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://v3.football.api-sports.io/players/topscorers",
        {
          params: { league: selectedLeague, season: selectedSeason },
          headers: {
            "x-apisports-key": import.meta.env.VITE_API_KEY
          }
        }
      );
      const data = response.data.response;

      const labels = data.map(player => player.player.name);
      const goals = data.map(player => player.statistics[0].goals.total);

      setChartData({
        labels,
        datasets: [
          {
            label: t("topScorers.goals"),
            data: goals,
            backgroundColor: "rgba(16, 185, 129, 0.7)"
          }
        ]
      });
      setPlayers(data);
    } catch (err) {
      console.error("❌ Error al obtener datos:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(season, league);
  }, [season, league]);

  const filteredPlayers = players.filter((player) => {
    const matchesPosition =
      positionFilter === "All" ||
      player.statistics[0].games.position === positionFilter;
    const matchesNationality =
      nationalityFilter === "All" ||
      player.player.nationality === nationalityFilter;
    return matchesPosition && matchesNationality;
  });

  const availablePositions = [...new Set(players.map(p => p.statistics[0].games.position))];
  const availableNationalities = [...new Set(players.map(p => p.player.nationality))];

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4">
        {t("topScorers.title")}
      </h2>

      {/* Selectores */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
        <label className="font-semibold">
          {t("topScorers.league")}:&nbsp;
          <select
            value={league}
            onChange={(e) => setLeague(parseInt(e.target.value))}
            className="border rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {leagues.map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </label>

        <label className="font-semibold">
          {t("topScorers.season")}:&nbsp;
          <select
            value={season}
            onChange={(e) => setSeason(parseInt(e.target.value))}
            className="border rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </label>

        <label className="font-semibold">
          {t("topScorers.position")}:&nbsp;
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="border rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="All">{t("topScorers.all")}</option>
            {availablePositions.map((pos, idx) => (
              <option key={idx} value={pos}>{pos}</option>
            ))}
          </select>
        </label>

        <label className="font-semibold">
          {t("topScorers.nationality")}:&nbsp;
          <select
            value={nationalityFilter}
            onChange={(e) => setNationalityFilter(e.target.value)}
            className="border rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="All">{t("topScorers.all")}</option>
            {availableNationalities.map((nation, idx) => (
              <option key={idx} value={nation}>{nation}</option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <p className="text-center">{t("topScorers.loading")}</p>
      ) : (
        <>
          {chartData && <Bar data={chartData} />}
          {!filteredPlayers.length && (
            <p className="text-center mt-4 text-gray-500">{t("topScorers.noData")}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {filteredPlayers.map((item) => (
              <div
                key={item.player.id}
                className="flex bg-white dark:bg-gray-800 rounded shadow p-3 space-x-4 items-center relative"
              >
                {/* ❤️ Botón de favoritos */}
                <button
                  onClick={() => toggleFavorite(item)}
                  className="absolute top-2 right-2 text-2xl text-gray-700 dark:text-gray-100"
                  title={t("topScorers.favoritesAdd")}
                >
                  {favorites.find(fav => fav.player.id === item.player.id) ? "❤️" : "🤍"}
                </button>

                <img
                  src={item.statistics[0].team.logo}
                  alt={item.statistics[0].team.name}
                  className="w-12 h-12 rounded-full border"
                />

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.player.photo}
                      alt={item.player.name}
                      className="w-10 h-10 rounded-full border"
                    />
                    <p className="font-bold text-gray-900 dark:text-gray-100">{item.player.name}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.player.nationality} – {item.statistics[0].team.name}
                  </p>
                </div>

                <span className="text-green-600 font-bold text-xl">
                  {item.statistics[0].goals.total} ⚽
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TopScorersChart;
