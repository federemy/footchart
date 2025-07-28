import { Routes, Route, Link } from "react-router-dom";
import TopScorersChart from "./components/TopScorersChart";
import FavoritesPage from "./pages/FavoritesPage";
import AboutPage from "./pages/AboutPage";
import NewsPage from "./pages/NewsPage";
import SearchPage from "./pages/SearchPage";
import ComparePage from "./pages/ComparePage";
import { useDarkMode } from "./hooks/useDarkMode";
import { useTranslation } from "react-i18next";

function App() {
  const [isDark, toggleDarkMode] = useDarkMode();
  const { t, i18n } = useTranslation();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <div className="flex gap-4">
          {/* Botón dark mode */}
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {isDark ? t("light_mode") : t("dark_mode")}
          </button>

          {/* Selector de idioma */}
          <select
            value={i18n.language} // 👈 Muestra idioma actual
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="px-2 py-1 border rounded"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </div>
      </header>

      {/* Navegación */}
      <nav className="mb-6 flex flex-wrap gap-2">
        <Link to="/" className="text-green-600 hover:underline">
          {t("nav.stats")}
        </Link>
        <Link to="/news" className="text-green-600 hover:underline">
          {t("nav.news")}
        </Link>
        <Link to="/favorites" className="text-green-600 hover:underline">
          {t("nav.favorites")}
        </Link>
        <Link to="/about" className="text-green-600 hover:underline">
          {t("nav.about")}
        </Link>
        <Link to="/search" className="text-green-600 hover:underline">
          {t("nav.search")}
        </Link>
        <Link to="/compare" className="text-green-600 hover:underline">
          {t("nav.compare")}
        </Link>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<TopScorersChart />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </div>
  );
}

export default App;
