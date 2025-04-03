import en from "./en"
import fr from "./fr"
import ar from "./ar"

const translations = {
  en,
  fr,
  ar,
}

export type TranslationKey = keyof typeof en

export default translations

