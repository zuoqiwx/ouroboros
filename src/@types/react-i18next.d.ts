import { resources, defaultNS } from "../i18n/i18n";

declare module "react-i18next" {
  interface CustomTypeOptions {
    returnNull: false;
    defaultNS: typeof defaultNS;
    resources: typeof resources["en"];
  }
}
