import React from 'react';
import './SoundEditor.css';

const SoundEditor = ({ onVolumeChange, togglePlayer}) => {
    return (
        <div className="editor-container">
            <div className="volume-container">
                <input
                    className="volume-slider"
                    type="range"
                    onChange={onVolumeChange}
                    defaultValue={1}
                    min={-1}
                    max={1}
                    step={0.01}
                />
                <div className='toolbar'>
                    <button type="button" onClick={togglePlayer('play')}>Play</button>
                    <button type="button" onClick={togglePlayer('pause')}>Pause</button>
                    <button type="button" onClick={togglePlayer('stop')}>Stop</button>
                </div>
            </div>
        </div>
    );
};

export default SoundEditor;