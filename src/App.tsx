import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from '/components/AddProduct';
import LoginPage from './components/LoginPage';
import { auth } from './config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css'

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Página principal con listado de productos */}
        <Route path='/' element={<ProductList />} />

        {/* Página de inicio de sesión */}
        <Route path='/login' element={<LoginPage />} />

        {/* Página para agregar producto, protegida con inicio de sesión */}
        <Route path='/add-product' element={user ? <AddProduct /> : <Navigate to ='/login'/>} />
      </Routes>
    </Router>
  );
};

export default App;