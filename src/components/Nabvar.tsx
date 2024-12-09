import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Inicio</Link> {/* Enlace a la página principal */}
                </li>
                <li>
                    <Link to='/login'>Iniciar sesión</Link> {/* Enlace al login */}
                </li>
                <li>
                    <Link to='/add-product'>Agregar Producto</Link> {/*Enlace al formulario para agregar producto */}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;