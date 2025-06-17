import React, { useState } from 'react';
import './public/body.css'
import NetworkVisualization from './canvas';

export default function Body() {
    const [layers, setLayers] = useState([]);
    const [neuronCounts, setNeuronCounts] = useState([]);

    const addLayer = () => {
        setLayers(prev => [...prev, `Layer ${prev.length + 1}`]);
        setNeuronCounts(prev => [...prev, 1]); // Default to 1 neuron
    };

    const updateNeuronCount = (index, count) => {
        const newCount = Math.max(1, Math.min(20, parseInt(count) || 1)); // Limit between 1 and 20
        setNeuronCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = newCount;
            return newCounts;
        });
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
                            <input 
                                className='input' 
                                min="1"
                                max="20"
                                value={neuronCounts[idx] || 1}
                                onChange={(e) => updateNeuronCount(idx, e.target.value)}
                            />
                            neurons
                        </div>
                    </div>
                ))}
            </div>

            <NetworkVisualization layers={layers} neuronCounts={neuronCounts} />
        </div>
    )
}