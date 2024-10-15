import React from 'react';

interface ResultDisplayProps {
    recognized: boolean;
    confidence: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ recognized, confidence }) => {
    return (
        <div>
            <h3>{recognized ? 'Person Recognized' : 'Person Not Recognized'}</h3>
            <p>Confidence: {confidence.toFixed(3)}</p>
        </div>
    );
};

export default ResultDisplay;
