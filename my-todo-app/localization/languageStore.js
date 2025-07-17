import { makeAutoObservable } from "mobx";

class LanguageStore {
    language = "en";

    constructor() {
        makeAutoObservable(this);
    }

    setLanguage(lang) {
        this.language = lang;
    }
}

export const languageStore = new LanguageStore();
