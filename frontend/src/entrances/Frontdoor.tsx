import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import ThresholdSlider from "../components/ThresholdSlider";
import ResultDisplay from "../components/ResultDisplay";
import { HStack } from "../components/flex";
import { ArrowBackIos } from "@mui/icons-material";
import { Typography } from "@mui/joy";
import ImagePre from "../components/ImagesPre";
import { useImageHandlers } from '../components/handlers';

import recognizedImage from './images/grundriss_frontdoor_open.jpg';
import unrecognizedImage from './images/grundriss_frontdoor_closed.jpg';

const Frontdoor: React.FC = () => {
    const navigate = useNavigate();
    const {
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
    } = useImageHandlers(navigate);

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
            <HStack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Button onClick={handleBackClick} startDecorator={<ArrowBackIos />} variant="plain">
                    Go Back
                </Button>
                <Typography level="h3" sx={{ marginLeft: '16px' }}>
                    Frontdoor
                </Typography>
            </HStack>
            <ImagePre
                onUpload={handleUpload}
                onSelect={handleImageSelect}
                selectedImage={selectedImage}
                uploadedImages={uploadedImages}
            />
            <ThresholdSlider onThresholdChange={handleThresholdChange} />
            <Button onClick={handleSubmit}>Submit</Button>

            {result && (
                <>
                    <ResultDisplay recognized={result.recognized} confidence={result.confidence} />
                    <img
                        src={result.recognized ? recognizedImage : unrecognizedImage}
                        alt={result.recognized ? "Face Recognized" : "Face Not Recognized"}
                        style={{ width: '600px', height: 'auto', marginTop: '20px' }}
                    />
                </>
            )}
            {!result && (
                <>
                    <img
                        src={unrecognizedImage}
                        alt={"Frontdoor"}
                        style={{ width: '600px', height: 'auto', marginTop: '20px' }}
                    />
                </>
            )}
        </div>
    );
};

export default Frontdoor;
