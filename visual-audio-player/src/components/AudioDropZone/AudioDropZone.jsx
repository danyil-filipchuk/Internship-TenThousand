import React from 'react';
import './AudioDropZone.css';

const AudioDropZone = ({onDrop, onDragOver, uploadAudio}) => {
    return (
        <div className='main-container'>
            <div className='drop-zone'
                 onDrop={onDrop}
                 onDragOver={onDragOver}
                >
                <p>drag & drop audio file here</p>
                <p>or</p>
                <div className='upload-input'>
                    <label className='upload-label'>
                        Choose file
                        <input
                            type="file"
                            name="sound"
                            onChange={uploadAudio}
                            accept="audio/*"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default AudioDropZone;