import React from 'react';
import { Box } from "@mui/joy";
import ImageUpload from "./ImageUpload";

interface ImagePreProps {
    onUpload: (image: File) => void;
    onSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedImage: string;
    uploadedImages: { name: string; file: File }[];
}

const ImagePre: React.FC<ImagePreProps> = ({ onUpload, onSelect, selectedImage, uploadedImages }) => {
    const predefinedImages = [
        { src: '/images/home_owner.png', name: 'home_owner.png' },
        { src: '/images/female.png', name: 'female.png' },
        { src: '/images/male.png', name: 'male.png' },
        { src: '/images/male2.png', name: 'male2.png' }
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                flexDirection: 'column',
            }}
        >
            <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Render predefined images */}
                {predefinedImages.map((image, index) => (
                    <Box
                        key={index}
                        sx={{
                            border: '2px dashed #ccc',
                            borderRadius: '10px',
                            width: '150px',
                            height: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={image.src}
                            alt={`Predefined ${index}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <input
                            type="radio"
                            name="predefinedImage"
                            value={image.name}
                            onChange={onSelect}
                            checked={selectedImage === image.name}
                            style={{ position: 'absolute', bottom: '10px', left: '10px' }}
                        />
                    </Box>
                ))}

                {/* Render uploaded images */}
                {uploadedImages.map((uploadedImage, index) => (
                    <Box
                        key={index}
                        sx={{
                            border: '2px dashed #ccc',
                            borderRadius: '10px',
                            width: '150px',
                            height: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            cursor: 'pointer',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={URL.createObjectURL(uploadedImage.file)}
                            alt={`Uploaded ${index}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <input
                            type="radio"
                            name="uploadedImage"
                            value={uploadedImage.name}
                            onChange={onSelect}
                            checked={selectedImage === uploadedImage.name}
                            style={{ position: 'absolute', bottom: '10px', left: '10px' }}
                        />
                    </Box>
                ))}

                {/* Upload component */}
                <ImageUpload onUpload={onUpload} />
            </Box>
        </Box>
    );
};

export default ImagePre;
