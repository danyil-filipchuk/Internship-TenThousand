import React from 'react';

const SoundEditor = ({ onVolumeChange, togglePlayer}) => {
    return (
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
    );
};

export default SoundEditor;