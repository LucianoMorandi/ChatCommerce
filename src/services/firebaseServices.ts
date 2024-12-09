import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Asegúrate de que la ruta sea correcta

export interface Product {
    id: string;
    imageUrl: string;
    name: string;
    price: number;
    brand: string;
  }
  
  // Obtener productos desde Firestore
  export const fetchProducts = async (): Promise<Product[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
  
        // Validar y convertir los datos a un objeto Product
        return {
          id: doc.id,
          imageUrl: data.imageUrl || "",
          name: data.name || "",
          price: data.price || 0,
          brand: data.brand || "",
        } as Product;
      });
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      throw new Error("No se pudieron obtener los productos");
    }
  };

// Función para guardar la URL de la imagen en Firestore
export const saveImageUrl = async (imageUrl: string) => {
    try {
        const docRef = await addDoc(collection(db, "images"), { url: imageUrl }); // Guarda la URL en la colección "images"
        console.log("URL guardada con ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error al guardar la URL en Firestore:", error);
        throw new Error("No se pudo guardar la URL");
    }
};

// Guardar un producto en Firestore
export const saveProduct = async (product: {
    imageUrl: string;
    name: string;
    price: number;
    brand: string;
}) => {
    try {
        const docRef = await addDoc(collection(db, 'products'), product);
        console.log('Producto guardado con ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        throw new Error('No se pudo guardar el producto');
    }
};

// Obtener marcas desde Firestore
export const fetchBrands = async () => {
    try {
        const querySnapchot = await getDocs(collection(db, 'brands'));
        const brands = querySnapchot.docs.map((doc) => doc.data().name);//Buscar nombre de marcas
        return brands;
    } catch (error) {
        console.error('Error al obtener las marcas', error);
        throw new Error('No se pudieron obtener las marcas');
    }
};

// Guardar una nueva marca
export const saveBrand = async (brandName: string) => {
    try {
        const docRef = await addDoc(collection(db, 'brands'), {name: brandName});
        console.log('Marca guardada con ID;', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error al guardar la marca:', error);
        throw new Error('No se pudo guardar la marca');
    }
};