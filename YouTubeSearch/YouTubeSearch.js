
// Виносимо ключ та хост в окремі константи
const API_KEY = '11f4ab7d68mshee0af65156bf3b2p14fe74jsn6b93ac508c69';
const API_HOST = 'youtube138.p.rapidapi.com';

// Отримуємо селектори на DOM елементи
const input = document.getElementById('searchInput');
const results = document.getElementById('results');

// Створюємо змінну, в яку будемо заносити AbortController
let controller;

// Функція затримки відправки запиту при вводі інпута
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    }
}

// Основна функція з fetch - відправляє запит та виводить результат на екран
function youTubeSearch() {

    // Якщо існує попередній AbortController - скасовуємо його
    if (controller) {
        controller.abort();
    }

    // Створюємо новий AbortController
    controller = new AbortController();

    // Отримуємо дані з інпуту
    const value = input.value.trim();
    if (!value) {
        results.innerHTML = '';
        return;
    }

    fetch(`https://${API_HOST}/search/?q=${encodeURIComponent(value)}&hl=en&gl=US`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        },
        signal: controller.signal // передаємо AbortController у fetch
    })
    .then(response => {
        if(!response.ok) {
            throw new Error(`Помилка: ${response.status}`);
        }
        return response.json();
    })
        // Блок коду з роботою над отриманими даними та виводом їх на сторінку
        .then(data => {
            results.innerHTML = '';
            (data.contents || []).forEach((item) => {
                if (item.type !== 'video') {
                    return;
                }
                const video = item.video;

                console.log(video.title);

                const title = video.title || 'Без назви';
                const thumbnail = video.thumbnails?.[0]?.url || '';
                const videoId = video.videoId;

                const videoElement = document.createElement('div');
                videoElement.className = 'video';
                videoElement.innerHTML = `
                <img src="${thumbnail}" alt="thumbnail">
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">${title}</a>
                `;
                results.appendChild(videoElement);
            })
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('Запит було скасовано');
            } else {
                console.error('Помилка:', error);
                results.innerHTML = '<p>Сталася помилка при запиті. Спробуйте пізніше.</p>';
            }
        });
    }

    // Лісенер інпута з функцією затримки та вказаним часом
    input.addEventListener('input', debounce(youTubeSearch, 1000));

