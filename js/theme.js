(function() {
    // Определяем сохранённую тему
    let currentTheme = localStorage.getItem('theme') || 'auto';
    
    // Функция применения темы
    function applyTheme(theme) {
        if (theme === 'auto') {
            const hour = new Date().getHours();
            const isDay = hour >= 6 && hour < 18;
            const autoTheme = isDay ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', autoTheme);
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }
    
    // Применяем тему при загрузке
    applyTheme(currentTheme);
    
    // Навешиваем обработчики на кнопки
    document.addEventListener('DOMContentLoaded', function() {
        const buttons = document.querySelectorAll('[data-theme]');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                if (theme) {
                    currentTheme = theme;
                    localStorage.setItem('theme', theme);
                    applyTheme(theme);
                }
            });
        });
    });
})();