// Імпортуємо бібліотеку для побудови графіків
import * as d3 from 'd3';

// Оголошення класу Drawer
class Drawer {

    constructor(buffer, parent) { // Конструктор приймає аудіо-буфер та DOM-елемент, куди будемо рендерити SVG
        this.buffer = buffer; // Зберігаємо буфер
        this.parent = parent; // Зберігаємо DOM-елемент
        this.cursor = null;
        this.onSeek = () => {};
    }

    updateCursor(currentTime, duration) {
        if(!this.cursor) {
            return;
        }

        const width = this.parent.clientWidth;
        const x = (currentTime / duration) * width;

        this.cursor.attr('transform', `translate(${x}, 0)`);
    }

    enableCursorDragging(duration, onSeek) {
        let isDragging = false;

        const onMouseDown = (event) => {
            isDragging = true;
            event.preventDefault();
        }

        const onMouseMove = (event) => {
            if (!isDragging) {
                return;
            }

            const rect = this.parent.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const clampedX = Math.max(0, Math.min(x, rect.width));

            const time = (clampedX / rect.width) * duration;
            this.cursor.attr('transform', `translate(${clampedX}, 0)`);
            onSeek(time);
        }

        const onMouseUp = () => {
            isDragging = false;
        }

        this.cursor.on('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    // Метод для створення міток часу (00:00, 00:10, 00:20, ...)
    getTimeDomain() {
        const step = 10; // Крок у секундах (10 секунд)
        const steps = Math.ceil(this.buffer.duration / step); // Загальна кількість кроків (залежить від тривалості аудіо)

        // Створюємо масив часових міток
        return [...new Array(steps)].map((_, index) => {
            const date = new Date(1970, 0, 1, 0, 0, 0, 0); // Початкова дата
            date.setSeconds(index * step); // Додаємо час для кожної мітки

            // Форматуємо хвилини та секунди як рядки з 2 цифрами
            let minutes = date.getMinutes().toString();
            if (minutes.length === 1) {
                minutes = `0${minutes}`;
            }

            let seconds = date.getSeconds().toString();
            if (seconds.length === 1) {
                seconds = `0${seconds}`;
            }

            return `${minutes}:${seconds}`; // Повертаємо мітку у форматі 00:10
        });
    }

    // Основний метод, який створює хвильову форму
    generateWaveform(audioData, options = {}) {

        // Деструктуризуємо налаштування з об’єкта options або задаємо значення за замовчуванням
        const {
            margin = { top: 0, bottom: 0, left: 0, right: 0 },
            height = this.parent.clientHeight,
            width = this.parent.clientWidth,
            padding = 1
        } = options;

        // Знаходимо мінімальне та максимальне значення амплітуди (це функція з бібліотеки, яка повертає масив з двох значень)
        const domain = d3.extent(audioData);

        // Створюємо шкалу по осі X
        const xScale = d3
            .scaleLinear()
            .domain([0, audioData.length - 1])
            .range([margin.left, width - margin.right]);

        // Створюємо шкалу по осі Y
        const yScale = d3
            .scaleLinear()
            .domain(domain.map(i => Number(i)))
            .range([margin.top, height - margin.bottom]);

        // Створюємо SVG-елемент
        const svg = d3.create('svg');

        // Задаємо базові стилі для SVG
        svg
            .style('width', this.parent.clientWidth)
            .style('height', this.parent.clientHeight)
            .style('display', 'block');

        // Додаємо сітку по X і Y
        svg
            .append('g')
            .attr('stroke-width', 0.5)
            .attr('stroke', '#D6E5D6')
            .call(g =>
                g
                    .append('g')
                    .selectAll('line')
                    .data(xScale.ticks())
                    .join('line')
                    .attr('x1', d => 0.5 + xScale(d))
                    .attr('x2', d => 0.5 + xScale(d))
                    .attr('y1', 0)
                    .attr('y2', this.parent.clientHeight)
            )
            .call(g =>
                g
                    .append('g')
                    .selectAll('line')
                    .data(yScale.ticks())
                    .join('line')
                    .attr('y1', d => yScale(d))
                    .attr('y2', d => yScale(d))
                    .attr('x1', 0)
                    .attr('x2', this.parent.clientWidth)
            );

        // Прозорий прямокутник для фону
        svg
            .append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'rgba(255, 255, 255, 0)');

        // Група елементів, яка міститиме стовпці хвилі
        const g = svg
            .append('g')
            .attr('transform', `translate(0, ${height / 2})`)
            .attr('fill', '#03A300');

        // Ширина одного стовпця
        const band = (width - margin.left - margin.right) / audioData.length;

        // Створення прямокутників для кожної амплітуди
        g.selectAll('rect')
            .data(audioData)
            .join('rect')
            .attr('fill', '#03A300')
            .attr('height', d => yScale(d))
            .attr('width', () => band * padding)
            .attr('x', (_, i) => xScale(i))
            .attr('y', d => -yScale(d) / 2)
            .attr('rx', band / 2)
            .attr('ry', band / 2);

        // Отримуємо часові мітки
        const bands = this.getTimeDomain();

        // Створюємо шкалу з підписами часу
        const bandScale = d3
            .scaleBand()
            .domain(bands)
            .range([margin.top, this.parent.clientWidth]);

        // Додаємо вісь знизу
        svg
            .append('g')
            .call(g => g.select('.domain').remove())
            .attr('stroke-width', 0)
            .style('color', '#95A17D')
            .style('font-size', 11)
            .style('font-weight', 400)
            .call(d3.axisBottom(bandScale.copy()));

        this.cursor = svg.append('g');

        this.cursor.append('line')
            .attr('y1', 0)
            .attr('y2', this.parent.clientHeight)
            .attr('stroke', 'red')
            .attr('stroke-width', 3);

        this.cursor.append('path')
            .attr('d', 'M -6 5 L 0 -5 L 6 5 Z')
            .attr('fill', 'red')
            .attr('transform', 'translate(0, 5)');

        // Повертаємо готовий SVG-елемент
        return svg;
    }

    // Обробка аудіо-даних: фільтрація і нормалізація
    clearData() {
        const rawData = this.buffer.getChannelData(0); // Отримуємо сирі аудіодані, це великий масив чисел в діапазоні -1 до 1 — амплітуди сигналу в кожен мілісекундний момент
        const samples = this.buffer.sampleRate; // Це частота дискретизації — скільки значень (семплів) у секунду. Наприклад, 44100
        const blockSize = Math.floor(rawData.length / samples); // Ділимо весь масив на маленькі блоки
        const filteredData = []; // Створення пустого масиву, далі в циклі в нього будемо пушити середню амплітуду

        // Розраховуємо середню амплітуду для кожного блоку
        for (let i = 0; i < samples; i++) {
            const blockStart = blockSize * i;
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
                sum += Math.abs(rawData[blockStart + j]);
            }
            filteredData.push(sum / blockSize);
        }

        // Знаходимо найбільше значення в filteredData, вираховуємо коефіцієнт multiplier, щоб усі значення були в межах [0, 1]
        // Повертаємо масштабований масив — саме його малює графік
        const multiplier = 1 / Math.max(...filteredData);
        return filteredData.map(n => n * multiplier);
    }

    // Запуск побудови графіка
    init() {
        const audioData = this.clearData(); // Обробляємо дані з методу clearData()
        const node = this.generateWaveform(audioData, {}); // Створюємо SVG в методі generateWaveform()
        this.parent.appendChild(node.node()); // Додаємо до DOM
        this.enableCursorDragging(this.buffer.duration, (time) => {
            this.onSeek(time);
        })
    }
}

export default Drawer;
