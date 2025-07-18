import TopScorersChart from "./components/TopScorersChart";
import Technologies from "./components/Technologies";

function App() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        ⚽ Top Scorers App con Escudos y Banderas
      </h1>
      <TopScorersChart />
      <Technologies />
    </div>
  );
}

export default App;
