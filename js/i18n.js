(function() {
    // Переводы
    const translations = {
        ru: {
            'hero.title': 'Всем привет!',
            'hero.description': 'Меня зовут Екатерина. Начинающий front-end разработчик. Давайте знакомиться!',
            'nav.about': 'Обо мне',
            'nav.achievements': 'Достижения',
            'nav.skills': 'Навыки',
            'nav.work': 'Работа',
            'nav.interests': 'Интересы',
            'nav.books': 'Книги',
            'nav.contact': 'Связаться',
            'about.title': 'Кальнеус Екатерина Евгеньевна',
            'about.subtitle': 'Все мы с чего-то начинали...',
            'about.text1': 'Выпускница физического факультета НГУ. Начинала с JavaScript, стажировалась в Itransition, выступала на Ломоносов-2023.',
            'about.text2': 'За время учебы познакомилась с Python, C, C++, React. Участвовала в школе Comptech.',
            'about.text3': 'Сейчас активно прокачиваю навыки и ищу работу в web-разработке.',
            'about.birthday': 'Дата рождения:',
            'about.location': 'Адрес:',
            'about.locationValue': 'г. Новосибирск, Россия',
            'about.education': 'Образование:',
            'about.educationValue': 'Физическая информатика, НГУ',
            'footer.copyright': 'Кальнеус Екатерина 2001 - 2025'
        },
        en: {
            'hero.title': 'Hello everyone!',
            'hero.description': 'My name is Ekaterina. Beginner front-end developer. Let\'s get acquainted!',
            'nav.about': 'About me',
            'nav.achievements': 'Achievements',
            'nav.skills': 'Skills',
            'nav.work': 'Work',
            'nav.interests': 'Interests',
            'nav.books': 'Books',
            'nav.contact': 'Contact',
            'about.title': 'Ekaterina Kalneus',
            'about.subtitle': 'Everyone starts somewhere...',
            'about.text1': 'Graduate of NSU Physics Department. Started with JavaScript, interned at Itransition, spoke at Lomonosov-2023.',
            'about.text2': 'During my studies, I learned Python, C, C++, React. Participated in Comptech school.',
            'about.text3': 'Now I\'m actively improving my skills and looking for a job in web development.',
            'about.birthday': 'Birth date:',
            'about.location': 'Location:',
            'about.locationValue': 'Novosibirsk, Russia',
            'about.education': 'Education:',
            'about.educationValue': 'Physical Informatics, NSU',
            'footer.copyright': 'Ekaterina Kalneus 2001 - 2025'
        }
    };
    
    // Текущий язык
    let currentLang = localStorage.getItem('locale') || 'ru';
    
    // Функция перевода страницы
    function translatePage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        document.documentElement.lang = lang;
    }
    
    // Применяем перевод при загрузке
    document.addEventListener('DOMContentLoaded', function() {
        translatePage(currentLang);
        
        // Навешиваем обработчики на кнопки языка
        const langButtons = document.querySelectorAll('[data-lang]');
        langButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                if (lang && lang !== currentLang) {
                    currentLang = lang;
                    localStorage.setItem('locale', lang);
                    translatePage(lang);
                }
            });
        });
    });
})();