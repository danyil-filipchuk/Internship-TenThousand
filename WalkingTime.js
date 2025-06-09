// весь нижче прописаний код виконується при завантажені сторінки
document.addEventListener('DOMContentLoaded', () => {

    // отриманий масив об'єктів
    const data = [
        { from: '2025-06-08T05:56:28+00:00', to: '2025-06-08T05:57:10+00:00' },
        { from: '2025-06-08T06:01:01+00:00', to: '2025-06-08T06:49:31+00:00' },
        { from: '2025-06-08T07:04:21+00:00', to: '2025-06-08T07:05:26+00:00' },
        { from: '2025-06-08T08:27:42+00:00', to: '2025-06-08T08:28:52+00:00' },
        { from: '2025-06-08T08:29:43+00:00', to: '2025-06-08T08:31:28+00:00' },
        { from: '2025-06-08T10:19:15+00:00', to: '2025-06-08T10:21:02+00:00' },
        { from: '2025-06-08T16:22:26+00:00', to: '2025-06-08T16:38:49+00:00' },
        { from: '2025-06-08T17:03:12+00:00', to: '2025-06-08T18:30:24+00:00' },
        { from: '2025-06-08T18:49:11+00:00', to: '2025-06-08T19:05:55+00:00' },
        { from: '2025-06-08T19:29:46+00:00', to: '2025-06-08T22:15:04+00:00' },
    ];

    // на всяк випадок сортуємо масив по часу за зростанням, але з використанням методу slice, щоб уникнути мутації оригінального масиву
    const sortedData = data.slice().sort((a, b) => new Date(a.from) - new Date(b.from));

    // за допомогою селектору визначаємо та виставляємо дату на сторінці, виходячи з першого об'єкта масиву
    // або показуємо 'No visits', якщо отриманий масив пустий
    const headerDate = document.querySelector('.header-date');
    if (sortedData.length > 0) {
        const headerDateFormat = new Date(sortedData[0].from);
        headerDate.textContent = headerDateFormat.toLocaleDateString('en-GB', {
            weekday: 'long',
            day:     'numeric',
            month:   'long',
            year:    'numeric'
        });
    } else {
        headerDate.textContent = 'No visits';
    }

    // за допомогою селектору визначаємо та виставляємо на сторінці кількість прогулянок, виходячи з кількості об'єктів в масиві
    // або показуємо 'Home Day', якщо отриманий масив пустий
    const headerCount = document.querySelector('.header-count');
    if (sortedData.length > 0) {
        headerCount.textContent = sortedData.length + ' Visits';
    } else {
        headerCount.textContent = 'Home Day';
    }

    // оголошуємо основні необхідні змінні для подальшіх дій та розрахунків
    const fullDayLine= document.querySelector('.full-day-line'); // знаходимо селектор для основної полоси
    const totalWidth= fullDayLine.clientWidth; // знаходимо ширину основної полоси
    const totalSecondsInDay= 60 * 60 * 24; // рахуємо кількість секунд в добі
    const oneSecondWidth= (totalWidth / totalSecondsInDay) * 0.75; // знаходимо приблизну ширину та кількість пікселів на одну секунду
    const minimumGapWidth= 5; // вказуємо мінімальну ширину між прогулянками
    const minimumCircleWidth= 24; // вказуємо мінімальну ширину кожної прогулянки
    const fifteenMinutes= 15 * 60; // рахуємо кількість секунд з 15 хвилин

    let prevEndSec = 0; //

    // перебір кожного елементу (тобто кожної прогулянки) масиву
    sortedData.forEach((item, index) => {

        // знаходимо початок та завершення прогулянки у форматі дати
        const startOfWalk = new Date(item.from);
        const endOfWalk   = new Date(item.to);

        // рахуємо кількість секунд від початку доби до початку та до завершення прогулянки
        const startSec = startOfWalk.getUTCHours() * 3600 + startOfWalk.getUTCMinutes() * 60 + startOfWalk.getUTCSeconds();
        const endSec   = endOfWalk.getUTCHours()   * 3600 + endOfWalk.getUTCMinutes()   * 60 + endOfWalk.getUTCSeconds();

        let homeTimeWidth; // оголошуємо змінну для подального внесення ширини між прогулянками (тобто час вдома)
        const differenceBetweenWalks = startSec - prevEndSec; // рахуємо кількість секунд між прогулянками

        if (index === 0) { // для першої прогулянки визначаємо відступ зліва (що більше між загальною шириною з початку доби або мінімальною шириною)
            homeTimeWidth = Math.max(startSec * oneSecondWidth, minimumGapWidth);
        } else if (differenceBetweenWalks <= fifteenMinutes) { // якщо між прогулянками було менше 15 хвилин, то елементи повинні налізти один на одного
            homeTimeWidth = -minimumCircleWidth / 2;
        } else { // інакше визначаємо відступ зліва (що більше між кількостю секунд між прогулянками або мінімальною шириною)
            homeTimeWidth = Math.max(differenceBetweenWalks * oneSecondWidth, minimumGapWidth);
        }

        const walkDuration = endSec - startSec; // рахуємо час прогулянки (кількість секунд)
        let walkDurationWidth; // оголошуємо змінну для ширини кожної прогулянки

        // Якщо прогулянка тривала більше однієї години, то визначаємо ширину кожної прогулянки (тобто кількість пікселів)
        // Якщо прогулнка тривала менше однієї години, то визначаємо мінімальну ширину кожної прогулянки
        if (walkDuration >= 3600) {
            walkDurationWidth = walkDuration * oneSecondWidth;
        } else {
            walkDurationWidth = minimumCircleWidth;
        }

        // створюємо HTML елемент - це загальний час вдома ДО прогулянки та самої прогулянки
        const wrapper = document.createElement('div');
        wrapper.classList.add('walk-wrapper');
        wrapper.style.width = homeTimeWidth + walkDurationWidth + 'px';

        // створюємо HTML елемент - це тільки час прогулянки
        const walkElement = document.createElement('div');
        walkElement.classList.add('walk-time');
        walkElement.style.width = walkDurationWidth + 'px';

        // Якщо прогулянка тривала більше однієї години, то додаємо клас 'long-walk-time' для зміни кольору в полосі на сторінці
        if (walkDuration >= 3600) {
            walkElement.classList.add('long-walk-time');
        }

        // додаємо в DOM вище створені елементи
        wrapper.appendChild(walkElement);
        fullDayLine.appendChild(wrapper);

        // оновлюємо час закінчення попередньої прогулянки, щоб при новому "проході" вірно порахувати різницю часу та відповідно ширину полоси
        prevEndSec = endSec;
    });
});