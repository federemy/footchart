import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

function NewsPage() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    console.log("📡 Solicitando noticias...");
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines", {
          params: {
            sources: "bbc-sport,espn",
            language: "en",
            pageSize: 12,
            apiKey: import.meta.env.VITE_NEWS_API_KEY,
          }
        }
      );
      console.log("✅ Respuesta de la API:", response.data);
      setArticles(response.data.articles);
    } catch (error) {
      console.error("❌ Error al cargar noticias:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <p className="text-center">{t("news.loading")}</p>;

  if (!articles.length) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">{t("news.title")}</h2>
        <p className="text-red-600">⚠️ {t("news.noNews")}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{t("news.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <div key={index} className="bg-white rounded shadow p-4">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}
            <h3 className="font-bold text-lg mb-2">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-green-600 hover:underline"
            >
              {t("news.readMore")} →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsPage;
