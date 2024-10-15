import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ThresholdSlider from './components/ThresholdSlider';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [threshold, setThreshold] = useState<number>(0.975);
  const [result, setResult] = useState<{ recognized: boolean, confidence: number } | null>(null);

  const handleUpload = (file: File) => {
    setImage(file);
  };

  const handleThresholdChange = (value: number) => {
    setThreshold(value);
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('threshold', threshold.toString());

    const response = await fetch('http://localhost:5000/recognize', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
      <div>
        <h1>Image Recognition</h1>
        <ImageUpload onUpload={handleUpload} />
        <ThresholdSlider onThresholdChange={handleThresholdChange} />
        <button onClick={handleSubmit}>Submit</button>
        {result && <ResultDisplay recognized={result.recognized} confidence={result.confidence} />}
      </div>
  );
};

export default App;
