import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../../locales/en/common.json";
import enRecordsStack from "../../locales/en/RecordsStack.json";
import enToolsStack from "../../locales/en/ToolsStack.json";
import enCatalogStack from "../../locales/en/CatalogStack.json";
import enSettingsStack from "../../locales/en/SettingsStack.json";
import zhCommon from "../../locales/zh-CN/common.json";
import zhRecordsStack from "../../locales/zh-CN/RecordsStack.json";
import zhToolsStack from "../../locales/zh-CN/ToolsStack.json";
import zhCatalogStack from "../../locales/zh-CN/CatalogStack.json";
import zhSettingsStack from "../../locales/zh-CN/SettingsStack.json";

export const defaultNS = "common";
export const resources = {
  en: {
    common: enCommon,
    RecordsStack: enRecordsStack,
    ToolsStack: enToolsStack,
    CatalogStack: enCatalogStack,
    SettingsStack: enSettingsStack,
  },
  "zh-CN": {
    common: zhCommon,
    RecordsStack: zhRecordsStack,
    ToolsStack: zhToolsStack,
    CatalogStack: zhCatalogStack,
    SettingsStack: zhSettingsStack,
  },
};

i18n
  .use(initReactI18next)
  .init({
    debug: process.env.APP_ENV === "development",
    resources,
    ns: [
      "common",
      "RecordsStack",
      "ToolsStack",
      "CatalogStack",
      "SettingsStack",
    ],
    defaultNS,
    fallbackNS: "common",
    lng: "zh-CN",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  })
  .then(() => console.info("i18next translation loaded"))
  .catch(() => console.error("i18next translation loading failed"));

export default i18n;
