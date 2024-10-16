import { useState } from 'react';

export const useImageHandlers = (navigate: any) => {
    const [image, setImage] = useState<File | null>(null);
    const [threshold, setThreshold] = useState<number>(0.975);
    const [result, setResult] = useState<{ recognized: boolean, confidence: number } | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleUpload = (file: File) => {
        setImage(file);
    };

    const handleThresholdChange = (value: number) => {
        setThreshold(value);
    };

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedImage(event.target.value);
    };

    const handleSubmit = async () => {
        const finalImage = image ? URL.createObjectURL(image) : selectedImage;

        if (!finalImage) return;

        const formData = new FormData();

        if (image) {
            formData.append('image', image);
        } else if (selectedImage) {
            formData.append('selectedImage', selectedImage);
        }

        formData.append('threshold', threshold.toString());

        try {
            const response = await fetch('http://localhost:5000/recognize', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return {
        image,
        threshold,
        result,
        selectedImage,
        handleBackClick,
        handleUpload,
        handleThresholdChange,
        handleImageSelect,
        handleSubmit,
    };
};
