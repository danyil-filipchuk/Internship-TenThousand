import React, { useCallback, useState, useRef } from 'react';
import SoundDriver from './SoundDriver';

// Оголошуємо компонент
function Player() {

    // Створюємо реф, у якому будемо зберігати екземпляр SoundDriver. Це дозволяє зберігати об'єкт між рендерами без повторного ініціювання
    const soundController = useRef(null);

    // Стан loading — використовується, щоб показати "Loading..." під час обробки аудіо
    const [loading, setLoading] = useState(false);

    const handleFile = useCallback(async (event) => {
        if (!event || !event.type.includes('audio')) {
            alert('Wrong audio file');
            return;
        }

        setLoading(true);

        // Створюємо екземпляр класу SoundDriver та викликаємо метод init в класі SoundDriver,
        // який у свою чергу створює екземпляр класу Drawer
        const soundInstance = new SoundDriver(event);
        try {
            await soundInstance.init(document.getElementById('waveContainer'));
            soundController.current = soundInstance; // Зберігаємо інстанс у useRef, щоб зберігався між рендерами
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            soundInstance.drawChart(); // Викликаємо метод drawChart у SoundDriver, який викликає метод init в Drawer
        }
    }, []);

    const uploadAudio = useCallback((event) => {
        const { files } = event.target;

        // Якщо файл не вибрано, то завершуємо
        if (!files.length) {
            return;
        }

        handleFile(files[0]).catch(console.error);
    }, [handleFile]);

    const onDrop = useCallback((event) => {
        event.preventDefault();
        const { files } = event.dataTransfer;

        // Якщо файл не вибрано, то завершуємо
        if (!files.length) {
            return;
        }

        handleFile(files[0]).catch(console.error);
    }, [handleFile]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
    }, []);

    // Фабрика функцій для керування кнопками Play, Pause, Stop
    const togglePlayer = useCallback(
        (type) => () => {
            if (type === 'play') {
                soundController.current?.play();
            } else if (type === 'stop') {
                soundController.current?.pause(true);
            } else {
                soundController.current?.pause();
            }
        },
        []
    );

    // Функція для зміни гучності
    const onVolumeChange = useCallback(
        (event) => {
            soundController.current?.changeVolume(Number(event.target.value));
        },
        []
    );

    return (
        <div style={{ width: '100%' }}>
            {!soundController.current && (
                <div style={{
                        textAlign: 'center',
                        padding: '2rem',
                        border: '2px dashed #ccc',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        margin: '5rem'
                    }}
                     onDrop={onDrop}
                     onDragOver={onDragOver}
                >

                    <p>Drag & drop audio file here</p>
                    <p>Or</p>
                    <input
                        type="file"
                        name="sound"
                        onChange={uploadAudio}
                        accept="audio/*"
                    />
                </div>
            )}
            {loading && 'Loading...'}

            <div style={{ width: '100%', height: '392px' }} id="waveContainer" />

            {!loading && soundController.current && (
                <div id="soundEditor">
                    <div id="controllPanel">
                        <input
                            type="range"
                            onChange={onVolumeChange}
                            defaultValue={1}
                            min={-1}
                            max={1}
                            step={0.01}
                        />

                        <button type="button" onClick={togglePlayer('play')}>
                            Play
                        </button>

                        <button type="button" onClick={togglePlayer('pause')}>
                            Pause
                        </button>

                        <button type="button" onClick={togglePlayer('stop')}>
                            Stop
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Player;
