// Створення класу та конструктору
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    emit(event, data) {
        const callbacks = this.events[event];
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
}

// Ініціалізація
const emitter = new EventEmitter();

// Отримання селекторів від ДОМ елементів
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');

// "Підписуємось" на події, модалка слухає їх
emitter.on('modal:open', () => {
    modal.classList.add('active');
    overlay.classList.add('active');
});

// "Підписуємось" на події, модалка слухає їх
emitter.on('modal:close', () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
})

// Кнопки - емітери подій
document.getElementById('openBtn').addEventListener('click', () => {
    emitter.emit('modal:open');
});

// Кнопки - емітери подій
document.getElementById('closeBtn').addEventListener('click', () => {
    emitter.emit('modal:close');
});
