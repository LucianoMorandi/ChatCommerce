import React, { useEffect, useState } from "react";
import { fetchBrands, saveBrand, saveProduct } from "../services/firebaseServices";
import { uploadImageToCloudinary } from "../services/cloudinaryServices";

const ProductForm: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [brands, setBrands] = useState<string[]>([]);
    const [newBrand, setNewBrand] = useState('');

    // Cargar marcas existentes
    useEffect(() => {
        const loadBrands = async () => {
            try {
                const fetchedBrands = await fetchBrands();
                setBrands(fetchedBrands);
            } catch (error) {
                console.error('Error al cargar marcas', error);
            }
        };

        loadBrands();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Subir imagen a Cloudinary
            let imageUrl = '';
            if (image) {
                imageUrl = await uploadImageToCloudinary(image);
            }

            // Guardar nueva marca si se ingresó una
            let selectedBrand = brand;
            if (newBrand) {
                await saveBrand(newBrand);
                selectedBrand = newBrand;
            }

            //Guardar producto en Firestore
            await saveProduct({
                imageUrl,
                name,
                price: parseFloat(price),
                brand: selectedBrand,
            });

            alert('Producto guardado con éxito!!');
            setImage(null);
            setName('');
            setPrice('');
            setBrand('');
            setNewBrand('');
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Imagen:</label>
                <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            </div>
            <div>
                <label>Nombre del producto:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Precio:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
                <label>Marca:</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option value="">Seleccionar marca</option>
                    {brands.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
                <div>
                    <label>Crear nueva marca:</label>
                    <input 
                    type="text"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    placeholder="Nueva marca" 
                    />
                </div>
            </div>
            <button type="submit">Guardar Producto</button>
        </form>
    );
};

export default ProductForm;