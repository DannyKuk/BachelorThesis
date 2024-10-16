import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import ThresholdSlider from "../components/ThresholdSlider";
import ResultDisplay from "../components/ResultDisplay";
import { HStack } from "../components/flex";
import { ArrowBackIos } from "@mui/icons-material";
import { Typography } from "@mui/joy";
import ImagePre from "../components/ImagesPre";

const Frontdoor: React.FC = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);
    const [threshold, setThreshold] = useState<number>(0.975);
    const [result, setResult] = useState<{ recognized: boolean; confidence: number } | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [uploadedImages, setUploadedImages] = useState<{ name: string; file: File }[]>([]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleUpload = (file: File) => {
        const fileName = file.name;
        setImage(file);
        setUploadedImages((prevImages) => [...prevImages, { name: fileName, file }]);
        setSelectedImage(fileName);
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

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                textAlign: 'center',
            }}
        >
            <HStack>
                <Button onClick={handleBackClick} startDecorator={<ArrowBackIos />} variant="plain" sx={{ marginTop: '20px' }}>Go Back</Button>
                <Typography level="h3">Frontdoor</Typography>
            </HStack>
            <ImagePre
                onUpload={handleUpload}
                onSelect={handleImageSelect}
                selectedImage={selectedImage}
                uploadedImages={uploadedImages}
            />
            <ThresholdSlider onThresholdChange={handleThresholdChange} />
            <Button onClick={handleSubmit}>Submit</Button>
            {result && <ResultDisplay recognized={result.recognized} confidence={result.confidence} />}
        </div>
    );
};

export default Frontdoor;
