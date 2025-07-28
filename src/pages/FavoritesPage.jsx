import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function FavoritesPage() {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.player.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (!favorites.length) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">{t("favorites.title")}</h2>
        <p className="text-gray-600">⚠️ {t("favorites.noFavorites")}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{t("favorites.title")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favorites.map((item) => (
          <div
            key={item.player.id}
            className="flex bg-white rounded shadow p-3 space-x-4 items-center relative"
          >
            {/* Quitar de favoritos */}
            <button
              onClick={() => removeFavorite(item.player.id)}
              className="absolute top-2 right-2 text-xl text-red-600"
              title={t("favorites.remove")}
            >
              ❌
            </button>

            <img
              src={item.player.photo}
              alt={item.player.name}
              className="w-12 h-12 rounded-full border"
            />
            <div className="flex-1">
              <p className="font-bold">{item.player.name}</p>
              <p className="text-sm text-gray-600">{item.statistics[0].team.name}</p>
            </div>
            <span className="text-green-600 font-bold">{item.statistics[0].goals.total} ⚽</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
