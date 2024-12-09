import React, { useState } from "react";
import { uploadImageToCloudinary } from "../services/cloudinaryServices";
import { saveProduct } from "../services/firebaseServices";
import { fetchBrands, saveBrand } from "../services/firebaseServices";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        imageUrl: '',
        name: '',
        price: '',
        brand: '',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [brands, setBrands] = useState<string[]>([]);
    const [newBrand, setNewBrand] = useState(''); // Para manejar nuevas marcas

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0])
        }
    };

    const handleFetchBrands = async () => {
        try {
            const fetchedBrands = await fetchBrands();
            setBrands(fetchedBrands);
        } catch (error) {
            console.error('Error al obtener las marcas:', error);
        }
    };

    const handleSaveBrand = async () => {
        try {
            if (newBrand) {
                await saveBrand(newBrand);
                handleFetchBrands(); //Actualizar lista de marcas
                setNewBrand('');
            }
        } catch (error) {
            console.error('Error al guardar la marca:', error);
        }
    };

    
};