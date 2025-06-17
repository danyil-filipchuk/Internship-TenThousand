document.addEventListener("DOMContentLoaded", () => {

    // Отримуємо селектори від DOM елементів
    const input = document.getElementById('messageInput');
    const button = document.getElementById('sentBtn');
    const messageContainer = document.getElementById('messagesContainer');

    // Створюємо канал
    const channel = new BroadcastChannel('chat_channel');

    // Прописуємо логіку роботи кнопки та надсилання повідомлення через канал
    button.addEventListener('click', () => {
        const message = input.value.trim();

        if (message !== '') {
            channel.postMessage(message);
            input.value = '';
            addDivBlock(`You: ${message}`);
        }
    })

    // Отримання повідомлення з іншої вкладки
    channel.onmessage = (event) => {
        addDivBlock(`Another tab: ${event.data}`);
    };

    // Окремо функція по створенню DOM елементів з текстом повідомлення
    function addDivBlock(text) {
        const div = document.createElement('div');
        div.textContent = text;
        div.classList.add('newMessage');
        messageContainer.appendChild(div);
    }

})