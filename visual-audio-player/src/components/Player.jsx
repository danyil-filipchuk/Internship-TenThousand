import React, { useCallback, useState, useRef } from 'react';
import SoundDriver from '../core/SoundDriver'
import AudioDropZone from './AudioDropZone/AudioDropZone';
import WaveContainer from "./WaveContainer/WaveContainer";
import SoundEditor from './SoundEditor/SoundEditor';

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
            await soundInstance.init(document.getElementById('wave-container'));
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
    const togglePlayer = useCallback((type) => () => {
            if (type === 'play') {
                soundController.current?.play();
            } else if (type === 'stop') {
                soundController.current?.pause(true);
            } else {
                soundController.current?.pause();
            }
        },
        []);

    // Функція для зміни гучності
    const onVolumeChange = useCallback(
        (event) => {
            soundController.current?.changeVolume(Number(event.target.value));
        },
        []
    );

    return (
        <div>
            {!soundController.current && (
                <AudioDropZone
                onDrop={onDrop}
                onDragOver={onDragOver}
                uploadAudio={uploadAudio}
                />
            )}

            {loading && 'Loading...'}

            <WaveContainer/>

            {!loading && soundController.current && (
                    <SoundEditor
                        onVolumeChange={onVolumeChange}
                        togglePlayer={togglePlayer}
                    />
            )}
        </div>
    );
}

export default Player;
