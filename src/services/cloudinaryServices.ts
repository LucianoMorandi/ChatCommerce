import axios from "axios";
import { CLOUDINARY_URL, UPLOAD_PRESET } from "../config/cloudinaryConfig";

export const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file); //archivo seleccionado
    formData.append('upload_preset', UPLOAD_PRESET); // Preset Configurado

    try {
        const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        //retorna la URL de la imagen cargada
        return response.data.secure_url;
    } catch (error) {
        console.error('Error al subir la imagen a Cloudinary:', error);
        throw new Error('No se pudo subir la imagen');
    }
};