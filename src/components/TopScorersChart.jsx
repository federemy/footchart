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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Diccionario para mapear nombres de países a códigos ISO
const countryCodes = {
  Argentina: "AR",
  Brazil: "BR",
  England: "GB",
  France: "FR",
  Spain: "ES",
  Norway: "NO",
  Portugal: "PT",
  Germany: "DE",
  Belgium: "BE",
  Netherlands: "NL",
  Italy: "IT",
  Croatia: "HR"
};

function TopScorersChart() {
  const [chartData, setChartData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [season, setSeason] = useState(2022);
  const [loading, setLoading] = useState(true);

  const fetchData = async (selectedSeason) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://v3.football.api-sports.io/players/topscorers",
        {
          params: { league: 39, season: selectedSeason }, // Premier League por defecto
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
            label: "Goles",
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
    fetchData(season);
  }, [season]);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4">Goles por jugador</h2>

      {/* Selector de temporada */}
      <div className="text-center mb-4">
        <label className="font-semibold">
          Temporada:&nbsp;
          <select
            value={season}
            onChange={(e) => setSeason(parseInt(e.target.value))}
            className="border rounded px-2 py-1"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </label>
      </div>

      {loading ? (
        <p className="text-center">Cargando datos...</p>
      ) : (
        <>
          {/* Gráfico */}
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
                tooltip: { enabled: true }
              }
            }}
          />

          {/* Lista de jugadores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {players.map((item) => (
              <div
                key={item.player.id}
                className="flex bg-white rounded shadow p-3 space-x-4 items-center"
              >
                {/* Escudo del equipo */}
                <img
                  src={item.statistics[0].team.logo}
                  alt={item.statistics[0].team.name}
                  className="w-12 h-12 rounded-full border"
                />

                <div className="flex-1">
                  {/* Foto y nombre */}
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.player.photo}
                      alt={item.player.name}
                      className="w-10 h-10 rounded-full border"
                    />
                    <p className="font-bold">{item.player.name}</p>
                  </div>

                  {/* Nacionalidad y equipo */}
                  <p className="text-sm text-gray-600 flex items-center space-x-1 mt-1">
                    {countryCodes[item.player.nationality] && (
                      <img
                        src={`https://flagsapi.com/${countryCodes[item.player.nationality]}/flat/24.png`}
                        alt={item.player.nationality}
                        className="w-5 h-5 rounded"
                      />
                    )}
                    <span>{item.player.nationality}</span>
                    <span>&middot;</span>
                    <span>{item.statistics[0].team.name}</span>
                  </p>
                </div>

                {/* Goles */}
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