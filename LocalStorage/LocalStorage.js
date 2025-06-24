window.addEventListener('DOMContentLoaded', () => {

    // Отримуємо селектори від DOM елементів
    const favoriteList = document.getElementById('favoriteList');
    const buttons = document.querySelectorAll('.fav-btn');

    // Створюємо змінну-масив, в яку будемо заносити улюблені монети та діставати їх зі сховища
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Логіка роботи при натискані кнопок.
    // Метод forEach тут тому що по селектору ми отримали NodeList. Але хоча це і не масив, але даний метод все рівно працює і з NodeList
    buttons.forEach((button) => {
        button.addEventListener('click', () => {

            // Беремо за допомогою dataset назву кожної монети (в ДОМ називається data-coin)
            const coinName = button.parentElement.dataset.coin;

            // Перевіряємо чи додана монети в улюблені чи ні (true or false)
            const isFavorite = favorites.includes(coinName);

            if (isFavorite) {
                favorites = favorites.filter(name => name !== coinName);
            } else {
                favorites.push(coinName);
            }

            // Заносимо оновлений масив з улюбленими монетами до сховища
            localStorage.setItem('favorites', JSON.stringify(favorites));

            // Викликаємо функції для оновлення стану кнопки та списку улюблених монет
            renderFavorites();
            updateButtonStatus();
        });
    });

    // Функція для оновлення стану кнопки (якщо монета є в списку улюблених, то оновлюємо текст кнопки)
    function updateButtonStatus () {
        buttons.forEach(button => {
            const coinName = button.parentElement.dataset.coin;
            if (favorites.includes(coinName)) {
                button.textContent = 'Delete from favorites';
            } else {
                button.textContent = 'Add to favorites';
            }
        });
    }

    // Функція для оновлення списку улюблених монет на сайті
    function renderFavorites() {
        favoriteList.innerHTML = '';
        favorites.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            favoriteList.appendChild(li);
        });
    }

    // "Слухач" того, чи були якісь зміни в сховищі для того, щоб синхронно змінити стан на інших відкритих вкладках
    window.addEventListener('storage', event => {
        if (event.key === 'favorites') {
            favorites = JSON.parse(event.newValue) || [];
        }

        // Оновлюємо інтерфейс після зміни в localStorage з іншої вкладки
        renderFavorites();
        updateButtonStatus();
    });

    // Вище вказані фукнції для оновлення стану і вигляду сторінки
    renderFavorites();
    updateButtonStatus();

});