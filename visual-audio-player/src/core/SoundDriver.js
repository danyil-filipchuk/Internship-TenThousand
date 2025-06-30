import Drawer from './Drawer';

// Оголошення класу SoundDriver, він відповідає за:
// Завантаження аудіофайлу, програвання/паузу, управління гучністю, створення графіка
class SoundDriver {

    // Метод, який викликається при створенні нового екземпляра класу
    constructor(audioFile) {
        this.audioFile = audioFile; // Зберігаємо переданий файл для подальшої обробки

        // Створюємо аудіо-контекст — головний інструмент для роботи зі звуком у Web Audio API.
        // (Підтримка старих браузерів через webkitAudioContext)
        this.context = new (window.AudioContext || window.webkitAudioContext)();

        // Ініціалізуємо всі ключові об’єкти, які створюються пізніше
        this.drawer = undefined;
        this.gainNode = undefined;
        this.audioBuffer = undefined;
        this.bufferSource = undefined;

        this.startedAt = 0;
        this.pausedAt = 0;
        this.isRunning = false;
        this.wasStopper = false;
    }

    static showError(error) {
        alert('SoundParser constructor error. Cannot read audio file as ArrayBuffer');
        return error;
    }

    seekTo(time) {
        this.pausedAt = time;

        if (this.isRunning) {
            this.pause().then(() => {
                this.play().catch(console.error);
            })
        } else {
            this.drawer.updateCursor(time, this.audioBuffer.duration);
        }
    }

    // Ініціалізує звук — читає файл, декодує, готує графік. Обгорнуто в Promise для асинхронності
    init(parent) {
        return new Promise((resolve, reject) => {
            // Якщо батьківський DOM-елемент не переданий — зупиняємо ініціалізацію
            if (!parent) {
                reject(new Error('Parent element not found'));
                return;
            }

            // Читаємо файл як ArrayBuffer, тобто бінарні дані для декодування
            const reader = new FileReader();
            reader.readAsArrayBuffer(this.audioFile);

            // Коли читання завершено, то декодуємо аудіо через loadSound(), далі зберігаємо буфер у this.audioBuffer,
            // створюємо Drawer для графіка та викликаємо resolve()
            reader.onload = (event) => {
                this.loadSound(event).then((buffer) => {
                    this.audioBuffer = buffer;
                    this.drawer = new Drawer(buffer, parent);
                    this.drawer.onSeek = (time) => {
                        this.seekTo(time);
                    }
                    resolve();
                });
            };

            // Якщо читання файлу дало помилку — передаємо її у reject() промісу
            reader.onerror = reject;
        });
    }

    // Метод перевіряє, чи є дані, декодує аудіо з ArrayBuffer через Web Audio API
    loadSound(readerEvent) {
        if (!readerEvent?.target?.result) {
            throw new Error('Cannot read file');
        }

        return this.context.decodeAudioData(readerEvent.target.result);
    }

    startCursorLoop() {
        const loop = () => {
            if (!this.isRunning || !this.audioBuffer || !this.drawer) {
                return;
            }

            const currentTime = this.context.currentTime - this.startedAt;
            const duration = this.audioBuffer.duration;

            this.drawer.updateCursor(currentTime, duration);
            this.cursorAnimationFrame = requestAnimationFrame(loop)
        }
        this.cursorAnimationFrame = requestAnimationFrame(loop)
    }

    // Якщо буфера ще нема, або вже відтворюється — нічого не робимо
    async play() {
        if (!this.audioBuffer) {
            throw new Error('Audio buffer not found. Call loadSound() first.');
        }

        if (this.isRunning) {
            return;
        }

        //Створюэмо контролер гучності та джерело звуку
        this.gainNode = this.context.createGain();
        this.bufferSource = this.context.createBufferSource();
        this.bufferSource.buffer = this.audioBuffer;

        // Підключаємо джерело звуку до контролера гучності
        this.bufferSource.connect(this.gainNode);
        this.bufferSource.connect(this.context.destination);
        this.gainNode.connect(this.context.destination);

        // Відновлюємо контекст (на випадок, якщо він був "заморожений") і запускаємо звук з позиції паузи
        await this.context.resume();
        this.bufferSource.start(0, this.pausedAt);

        // Оновлюємо час старту, скидаємо паузу, ставимо статус “грає”
        this.startedAt = this.context.currentTime - this.pausedAt;
        this.pausedAt = 0;
        this.isRunning = true;
        this.wasStopper = false;
        this.startCursorLoop();
    }

    // Зупиняємо звук через context.suspend(),але на відміну від .stop(), це не знищує об’єкти одразу
    async pause(reset) {
        if (!this.bufferSource || !this.gainNode) {
            throw new Error('Pause error: bufferSource not found. Did you call play()?');
        }

        await this.context.suspend();

        if (reset) {
            this.pausedAt = 0;
            this.startedAt = 0;
            this.wasStopper = true;
        } else {
            if (!this.wasStopper) {
                this.pausedAt = this.context.currentTime - this.startedAt
            }
        }

        // Зупиняємо джерело повністю, роз’єднуємо вузли, оновлюємо статус
        this.bufferSource.stop();
        this.bufferSource.disconnect();
        this.gainNode.disconnect();

        this.isRunning = false;
        cancelAnimationFrame(this.cursorAnimationFrame);

        if (this.drawer && this.audioBuffer) {
            this.drawer.updateCursor(this.pausedAt, this.audioBuffer.duration);
        }
    }

    // Міняємо гучність, якщо контролер вже створений
    changeVolume(volume) {
        if (!this.gainNode) return;
        this.gainNode.gain.value = volume;
    }

    // Запускаємо метод init() у класі Drawer, щоб відрендерити графік
    drawChart() {
        if (this.drawer?.init) {
            this.drawer.init();
        }
    }
}

export default SoundDriver;
