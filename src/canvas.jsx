import React, { useEffect, useRef } from 'react';
import './public/canvas.css';

const NetworkVisualization = ({ layers, neuronCounts }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (layers.length === 0) return;

        // Calculate positions
        const layerWidth = canvas.width / (layers.length + 1);
        const maxNeurons = Math.max(...neuronCounts);
        const neuronSpacing = canvas.height / (maxNeurons + 1);

        // Draw connections
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;

        for (let i = 0; i < layers.length - 1; i++) {
            const currentLayerX = layerWidth * (i + 1);
            const nextLayerX = layerWidth * (i + 2);
            
            const currentNeurons = neuronCounts[i];
            const nextNeurons = neuronCounts[i + 1];

            for (let j = 0; j < currentNeurons; j++) {
                const currentY = (canvas.height - (currentNeurons - 1) * neuronSpacing) / 2 + j * neuronSpacing;
                
                for (let k = 0; k < nextNeurons; k++) {
                    const nextY = (canvas.height - (nextNeurons - 1) * neuronSpacing) / 2 + k * neuronSpacing;
                    
                    ctx.beginPath();
                    ctx.moveTo(currentLayerX + 10, currentY);
                    ctx.lineTo(nextLayerX - 10, nextY);
                    ctx.stroke();
                }
            }
        }

        // Draw neurons
        ctx.fillStyle = '#4CAF50';
        
        for (let i = 0; i < layers.length; i++) {
            const x = layerWidth * (i + 1);
            const neurons = neuronCounts[i];
            
            for (let j = 0; j < neurons; j++) {
                const y = (canvas.height - (neurons - 1) * neuronSpacing) / 2 + j * neuronSpacing;
                
                ctx.beginPath();
                ctx.arc(x, y, 10, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }, [layers, neuronCounts]);

    return (
        <div className="network-visualization">
            <canvas 
                ref={canvasRef}
                width={800}
                height={400}
                className="network-canvas"
            />
        </div>
    );
};

export default NetworkVisualization; 