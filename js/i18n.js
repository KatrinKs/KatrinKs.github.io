// Internationalization Manager
class I18n {
    constructor() {
        this.currentLocale = localStorage.getItem('locale') || 'ru';
        this.translations = { ru: {}, en: {} };
        this.elements = new Map();
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.scanElements();
        this.applyTranslations();
        this.setupButtons();
        document.documentElement.lang = this.currentLocale;
    }

    async loadTranslations() {
        try {
            const [ru, en] = await Promise.all([
                fetch('/locales/ru.json').then(r => r.json()),
                fetch('/locales/en.json').then(r => r.json())
            ]);
            this.translations = { ru, en };
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    scanElements() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (key) {
                this.elements.set(el, key);
            }
        });
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => {
            if (acc && typeof acc === 'object') {
                return acc[part];
            }
            return '';
        }, obj);
    }

    applyTranslations() {
        const translations = this.translations[this.currentLocale];
        this.elements.forEach((key, element) => {
            const text = this.getNestedValue(translations, key);
            if (text && element.textContent) {
                element.textContent = text;
            }
        });
    }

    setupButtons() {
        const buttons = document.querySelectorAll('[data-lang]');
        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                if (lang && lang !== this.currentLocale) {
                    this.setLocale(lang);
                }
            });
        });
    }

    setLocale(locale) {
        this.currentLocale = locale;
        localStorage.setItem('locale', locale);
        document.documentElement.lang = locale;
        this.applyTranslations();
    }
}

// Initialize after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new I18n());
} else {
    new I18n();
}