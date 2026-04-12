class ContactForm {
    constructor() {
        const form = document.querySelector('.contact-me__form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        console.log('Form submitted:', Object.fromEntries(formData));
        alert('Сообщение отправлено! Я свяжусь с вами в ближайшее время.');
        form.reset();
    }
}

document.addEventListener('DOMContentLoaded', () => new ContactForm());