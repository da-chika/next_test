import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description.author")}</p>
      <p>{t("description.date")}</p>
      <p>{t("description.content")}</p>
    </div>
  );
}
