import React, { useState } from 'react';

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
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
    );
};

export default ImageUpload;
