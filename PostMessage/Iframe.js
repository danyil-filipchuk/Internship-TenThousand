document.addEventListener('DOMContentLoaded', () => {

    const iframeMessage = document.getElementById('iframeMessage');
    const iframeInput = document.getElementById('iframeInput');

    // Перевірка отримання повідомлення з Iframe
    window.addEventListener('message', (event) => {
        if (event.origin !== location.origin) {
            return;
        }
        if (typeof event.data !== 'string') {
            return;
        }

        iframeMessage.textContent = `Отримано з Parent: ${event.data}`;
    });

    // Коли натискається кнопка, ми надсилаємо повідомлення у вмонтований Iframe
    document.getElementById('ButtonSendToParent').addEventListener('click', () => {
        const message = iframeInput.value.trim();

        if (message !== '') {
            // вікно батька завжди доступне через window.parent без жодного селектора
            window.parent.postMessage(message, location.origin);
            iframeInput.value = '';
        }
    });
})
