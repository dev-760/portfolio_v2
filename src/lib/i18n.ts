// Internationalization utilities
import { translations, Locale, TranslationKeys } from "@/data/translations";

export type { Locale, TranslationKeys };

export function getTranslations(locale: Locale): TranslationKeys {
    return translations[locale];
}

export function isRTL(locale: Locale): boolean {
    return locale === "ar";
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
    return isRTL(locale) ? "rtl" : "ltr";
}

export function getOtherLocale(locale: Locale): Locale {
    return locale === "ar" ? "en" : "ar";
}

export const locales: Locale[] = ["ar", "en"];

export const defaultLocale: Locale = "en";

// Type-safe translation accessor
type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export function t(
    translations: TranslationKeys,
    key: string
): string {
    const keys = key.split(".");
    let value: unknown = translations;

    for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
            value = (value as Record<string, unknown>)[k];
        } else {
            return key; // Return key if not found
        }
    }

    return typeof value === "string" ? value : key;
}
