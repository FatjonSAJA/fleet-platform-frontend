import { i18n } from "@lingui/core";

export const locales = {
  en: "English",
  fr: "Français",
};
export type Locale = keyof typeof locales;

export async function dynamicActivate(locale: Locale) {
  const { messages } = await import(`@/locales/${locale}/messages.po`);

  i18n.load(locale, messages);
  i18n.activate(locale);
}
