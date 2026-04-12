// Theme Manager with TypeScript-like logic
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'auto';
        this.systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupSystemListener();
        this.setupButtons();
    }

    setupSystemListener() {
        this.observer = window.matchMedia('(prefers-color-scheme: dark)');
        this.observer.addEventListener('change', (e) => {
            this.systemTheme = e.matches ? 'dark' : 'light';
            if (this.currentTheme === 'auto') {
                this.applyAutoTheme();
            }
        });
    }

    applyAutoTheme() {
        const effectiveTheme = this.systemTheme;
        document.documentElement.setAttribute('data-theme', 'auto');
        document.documentElement.setAttribute('data-theme-applied', effectiveTheme);
        this.updateThemeMeta(effectiveTheme);
    }

    applyTheme() {
        if (this.currentTheme === 'auto') {
            this.applyAutoTheme();
        } else {
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            document.documentElement.removeAttribute('data-theme-applied');
            this.updateThemeMeta(this.currentTheme);
        }
    }

    updateThemeMeta(theme) {
        const meta = document.querySelector('meta[name="color-scheme"]');
        if (meta) {
            meta.setAttribute('content', theme);
        }
    }

    setupButtons() {
        const buttons = document.querySelectorAll('[data-theme]');
        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                if (theme) {
                    this.setTheme(theme);
                }
            });
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        this.applyTheme();
    }
}

// Initialize after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ThemeManager());
} else {
    new ThemeManager();
}