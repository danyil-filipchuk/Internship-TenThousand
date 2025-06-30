import React, {FC, DragEvent, ChangeEvent} from 'react';
import './AudioDropZone.css';

interface AudioDropZoneProps {
    onDrop: (event: DragEvent<HTMLDivElement>) => void;
    onDragOver: (event: DragEvent<HTMLDivElement>) => void;
    uploadAudio: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AudioDropZone: FC<AudioDropZoneProps> = ({onDrop, onDragOver, uploadAudio}) => {
    return (
        <div className='drop-zone-wrapper'>
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