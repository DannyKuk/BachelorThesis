import { useState } from 'react';

export const useImageHandlers = (navigate: any) => {
    const [image, setImage] = useState<File | null>(null);
    const [threshold, setThreshold] = useState<number>(0.975);
    const [result, setResult] = useState<{ recognized: boolean, confidence: number } | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [uploadedImages, setUploadedImages] = useState<{ name: string; file: File }[]>([]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleUpload = (file: File) => {
        const prefixedFile = new File([file], `UPLOAD_${file.name}`, { type: file.type });
        setImage(prefixedFile);
        setUploadedImages([{ name: prefixedFile.name, file: prefixedFile }]);
        setSelectedImage(prefixedFile.name);
    };

    const handleThresholdChange = (value: number) => {
        setThreshold(value);
    };

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedImage(event.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        if (selectedImage) {
            const uploadedImage = uploadedImages.find(image => image.name === selectedImage);
            if (uploadedImage) {
                formData.append('image', uploadedImage.file);
            } else {
                const predefinedImagePath = `/images/${selectedImage}`;
                const response = await fetch(predefinedImagePath);
                const blob = await response.blob();
                const file = new File([blob], selectedImage);
                formData.append('image', file);
            }
        }

        formData.append('threshold', threshold.toString());

        try {
            const response = await fetch('http://127.0.0.1:5000/recognize', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Response data:', data);
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
        uploadedImages,
        handleBackClick,
        handleUpload,
        handleThresholdChange,
        handleImageSelect,
        handleSubmit,
    };
};
