document.addEventListener('DOMContentLoaded', () => {

    const iframe = document.getElementById('childFrame');
    const parentInput = document.getElementById('parentInput');
    const parentMessage = document.getElementById('parentMessage');

    // Перевірка отримання повідомлення з Iframe
    window.addEventListener('message', (event) => {
        if (event.origin !== location.origin) {
            return;
        }
        if (typeof event.data !== 'string') {
            return;
        }

        parentMessage.textContent = `Отримано з Iframe: ${event.data}`;
    });

    // Коли натискається кнопка, ми надсилаємо повідомлення у вмонтований Iframe
    document.getElementById('ButtonSendToIframe').addEventListener('click', () => {
        const message = parentInput.value.trim();

        if (message !== '') {
            // Потрібен селектор iframe, щоб до нього звернутись та відправити в нього повідомлення
            iframe.contentWindow.postMessage(message, location.origin);
            parentInput.value = '';
        }
    });

});
