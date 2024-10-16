import React, { useState } from 'react';
import { Box, Typography } from "@mui/joy";

interface ImageUploadProps {
    onUpload: (image: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            onUpload(file);
        }
    };

    return (
        <Box
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
            onClick={() => {
                document.getElementById('fileInput')?.click();
            }}
        >
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            {!selectedFile ? (
                <Typography
                    sx={{ fontSize: '50px', color: '#ccc' }}
                    aria-hidden="true"
                >
                    +
                </Typography>
            ) : (
                <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Uploaded"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            )}
        </Box>
    );
};

export default ImageUpload;
