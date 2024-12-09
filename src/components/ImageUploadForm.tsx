import { useState } from "react";
import React from "react";
import { uploadImageToCloudinary } from "../services/cloudinaryServices";
import { saveImageUrl } from "../services/firebaseServices";

const ImageUploadForm: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    // Maneja el cambio del input del archivo
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setImageFile(file);
    };

    // Maneja la subida de la imagen
    const handleUpload = async () => {
        if (!imageFile) {
            alert('Por favor, selecciona una imagen antes de subirla');
            return;
        }

        setLoading(true);
        try {
            // subir imagen a Cloudinary
            const imageUrl = await uploadImageToCloudinary(imageFile);
            setUploadedImageUrl(imageUrl); // Guarga la URL generada

            // Guardar URL en Firebase Firestore
            const docId = await saveImageUrl(imageUrl);
            console.log('URL guardada con ID:', docId);

            alert('Imagen cargada y URL guardada exitosamente!!')
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema durante el proceso!!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Subir Imágen</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Cargando...' : 'Subir Imagen'}
            </button>

            {uploadedImageUrl && (
                <div>
                    <h3>Imagen subida</h3>
                    <img src={uploadedImageUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
                    <p>URL: <a href={uploadedImageUrl} target="_blank" rel="noopener noreferrer">{uploadedImageUrl}</a></p>
                </div>
            )}
        </div>
    );
};

export default ImageUploadForm