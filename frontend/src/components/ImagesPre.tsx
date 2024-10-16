import React from 'react';
import { Box } from "@mui/joy";
import ImageUpload from "./ImageUpload";

interface ImagePreProps {
    onUpload: (image: File) => void;
    onSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedImage: string;
}

const ImagePre: React.FC<ImagePreProps> = ({ onUpload, onSelect, selectedImage }) => {
    const images = [
        { src: '/images/home_owner.png', name: 'home_owner.png' },
        { src: '/images/female.png', name: 'female.png' },
        { src: '/images/male.png', name: 'male.png' }
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
            <Box sx={{display: 'flex', gap: 2}}>
                {images.map((image, index) => (
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
                            style={{position: 'absolute', bottom: '10px', left: '10px'}}
                        />
                    </Box>
                ))}
                <ImageUpload onUpload={onUpload}/>
            </Box>
        </Box>
    );
};

export default ImagePre;
