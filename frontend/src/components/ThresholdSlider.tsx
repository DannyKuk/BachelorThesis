import React, { useState } from 'react';

interface ThresholdSliderProps {
    onThresholdChange: (value: number) => void;
}

const ThresholdSlider: React.FC<ThresholdSliderProps> = ({ onThresholdChange }) => {
    const [threshold, setThreshold] = useState<number>(0.975);

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newThreshold = parseFloat(event.target.value);
        setThreshold(newThreshold);
        onThresholdChange(newThreshold);
    };

    return (
        <div>
            <label>Threshold: {threshold.toFixed(3)}</label>
            <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={threshold}
                onChange={handleSliderChange}
            />
        </div>
    );
};

export default ThresholdSlider;
