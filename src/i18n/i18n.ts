import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../../assets/locales/en/common.json";
import enRecordsStack from "../../assets/locales/en/RecordsStack.json";
import enToolsStack from "../../assets/locales/en/ToolsStack.json";
import enSettingsStack from "../../assets/locales/en/SettingsStack.json";
import zhCommon from "../../assets/locales/zh-CN/common.json";
import zhRecordsStack from "../../assets/locales/zh-CN/RecordsStack.json";
import zhToolsStack from "../../assets/locales/zh-CN/ToolsStack.json";
import zhSettingsStack from "../../assets/locales/zh-CN/SettingsStack.json";

export const defaultNS = "common";
export const resources = {
  en: {
    common: enCommon,
    RecordsStack: enRecordsStack,
    ToolsStack: enToolsStack,
    SettingsStack: enSettingsStack,
  },
  "zh-CN": {
    common: zhCommon,
    RecordsStack: zhRecordsStack,
    ToolsStack: zhToolsStack,
    SettingsStack: zhSettingsStack,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    ns: ["common", "RecordsStack", "ToolsStack", "SettingsStack"],
    defaultNS,
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
