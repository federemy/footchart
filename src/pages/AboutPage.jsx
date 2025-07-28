import React from "react";
import { useTranslation } from "react-i18next";

function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">{t("about.title")}</h1>
      
      <p className="mb-6">{t("about.description")}</p>

      <h2 className="text-2xl font-semibold mb-2">{t("about.technologiesTitle")}</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>{t("about.technologies.react")}</li>
        <li>{t("about.technologies.vite")}</li>
        <li>{t("about.technologies.tailwind")}</li>
        <li>{t("about.technologies.apiFootball")}</li>
        <li>{t("about.technologies.chartjs")}</li>
        <li>{t("about.technologies.pwa")}</li>
        <li>{t("about.technologies.router")}</li>
        <li>{t("about.technologies.i18next")}</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">{t("about.structureTitle")}</h2>
      <p className="mb-4">{t("about.structureIntro")}</p>
      <ul className="list-decimal pl-6 space-y-2">
        <li>{t("about.pages.topScorers")}</li>
        <li>{t("about.pages.search")}</li>
        <li>{t("about.pages.compare")}</li>
        <li>{t("about.pages.news")}</li>
        <li>{t("about.pages.favorites")}</li>
        <li>{t("about.pages.about")}</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">{t("about.howItWorksTitle")}</h2>
      <p>{t("about.howItWorks")}</p>
    </div>
  );
}

export default AboutPage;
