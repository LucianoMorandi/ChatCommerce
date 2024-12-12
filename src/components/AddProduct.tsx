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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageFile || !formData.name || !formData.price || !formData.brand) {
            alert('Por favor, completa todos los campos!!');
            return;
        }

        try {
            const uploadedImageUrl = await uploadImageToCloudinary(imageFile);
            const productData = { ...formData, imageUrl: uploadedImageUrl, price: Number(formData.price) };
            await saveProduct(productData);
            alert('Producto agregado con éxito!!');
            setFormData({ imageUrl: '', name: '', price: '', brand: ''});
            setImageFile(null);
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    };

    React.useEffect(() => {
        handleFetchBrands();
    }, []);

    return (
        <div>
            <h2>Agregar producto</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre del producto" value={formData.name} onChange={handleInputChange} />
                <input type="number" name="price" placeholder="Precio del producto" value={formData.price} onChange={handleInputChange} />

                <select name="brand" value={formData.brand} onChange={handleInputChange}>
                    <option value="">Selecciona una marca</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>

                <input type="text" placeholder="Nueva marca" value={newBrand} onChange={(e) => setNewBrand(e.target.value)} />
                <button type="button" onClick={handleSaveBrand}>Guardar nueva marca</button>

                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button type="submit">Agregar producto</button>
            </form>
        </div>
    );
};

export default AddProduct;