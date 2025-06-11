import React, { useState } from 'react';
import './public/body.css'

export default function Body() {
    const [layers, setLayers] = useState([]);

    const addLayer = () => {
        setLayers(prev => [...prev, `Layer ${prev.length + 1}`]);
    };

    return (
        <div className='body-container'>
            <button className='layer-button' onClick={addLayer}>
                + Add Layer
            </button>

            <div className='layer-list'>
                {layers.map((layer, idx) => (
                    <div key={idx} className='layer-item'>
                        <div>
                            {layer}
                        </div>
                        <div className='input-container'>
                            <input className='input' />
                            neurons
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}