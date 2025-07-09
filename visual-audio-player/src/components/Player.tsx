import React, {useCallback, useState, useRef, Fragment} from 'react';
import SoundDriver from '../core/SoundDriver'
import AudioDropZone from './AudioDropZone/AudioDropZone';
import WaveContainer from "./WaveContainer/WaveContainer";
import SoundEditor from './SoundEditor/SoundEditor';

// Оголошуємо компонент
function Player() {

    // Створюємо реф, у якому будемо зберігати екземпляр SoundDriver. Це дозволяє зберігати об'єкт між рендерами без повторного ініціювання
    const soundController = useRef<SoundDriver | null>(null);

    // Стан loading — використовується, щоб показати "Loading..." під час обробки аудіо
    const [loading, setLoading] = useState(false);

    // Обробник вибору або drop аудіофайлу
    const handleFile = useCallback(async (event: File) => {
        if (!event || !event.type.includes('audio')) {
            alert('Wrong audio file');
            return;
        }

        setLoading(true); // Вмикаємо лоадер

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

    // Обробка вибору файлу через input[type="file"]
    const uploadAudio = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        // Якщо файл не вибрано, то завершуємо
        if (!files || files.length === 0) {
            return;
        }

        handleFile(files[0]).catch(console.error);
    }, [handleFile]);

    // Обробник drop події на дроп-зоні
    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;

        // Якщо файл не вибрано, то завершуємо
        if (!files || files.length === 0) {
            return;
        }

        handleFile(files[0]).catch(console.error);
    }, [handleFile]);

    // Дозволяємо зону drop реагувати на dragOver
    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>)=> {
        event.preventDefault();
    }, []);

    // Фабрика функцій для керування кнопками Play, Pause, Stop
    const togglePlayer = useCallback((type: string) => () => {
            if (type === 'play') {
                soundController.current?.play().catch(console.error);
            } else if (type === 'stop') {
                soundController.current?.pause(true).catch(console.error);
            } else {
                soundController.current?.pause().catch(console.error);
            }
        }, []);

    // Функція для зміни гучності
    const onVolumeChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
                soundController.current?.changeVolume(Number(event.target.value));
        }, []);

    return (
        <>
            {!soundController.current && (
                <AudioDropZone
                onDrop={onDrop}
                onDragOver={onDragOver}
                uploadAudio={uploadAudio}
                />
            )}

            {loading && 'Loading...'}

            <><WaveContainer/></>

            {!loading && soundController.current && (
                    <SoundEditor
                        onVolumeChange={onVolumeChange}
                        togglePlayer={togglePlayer}
                    />
            )}
        </>
    );
}

export default Player;
