import React, { useState } from "react";
import ReactModal from "react-modal";
import { data } from "../data";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        maxWidth: '800px', // Adjust as needed
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '20px',
    },
};

export const ProductList = ({
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedProduct(null);
    };

    const onAddProduct = (product) => {
        if (allProducts.find(item => item.id === product.id)) {
            const products = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setTotal(total + product.price * product.quantity);
            setCountProducts(countProducts + product.quantity);
            return setAllProducts([...products]);
        }
        setTotal(total + product.price * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllProducts([...allProducts, product]);
    };

    return (
        <div className='container-items'>
            {data.map(product => (
                <div className='item' key={product.id}>
                    <figure>
                        <img
                            src={product.urlImage}
                            alt={product.title}
                            onClick={() => openModal(product)} // Open modal on image click
                        />
                    </figure>
                    <div className='info-product'>
                        <h4>{product.title}</h4>
                        <p className='price'>${product.price}</p>
                        <button onClick={() => onAddProduct(product)}>
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            ))}

            {/* Modal for product details */}
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Product Details"
            >
                {selectedProduct && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={selectedProduct.urlImage}
                            alt={selectedProduct.title}
                            style={{ width: '30rem', marginRight: '1rem', height: '20rem'}} // Adjust as needed
                        />
                        <div>
                            <h2>{selectedProduct.title}</h2>
                            <p style={{marginLeft:'0.5rem', marginBottom:'1rem', marginTop:'1rem'}}>Precio: ${selectedProduct.price}</p>
                            <h3 style={{marginLeft:'0.5rem'}}>Descripcion</h3> {/* Add description here */}
                            <p style={{marginLeft:'0.5rem'}}>{selectedProduct.description}</p>
                            <button className="button-cancel" onClick={closeModal} style={{marginLeft: '0.5rem', marginTop: '3rem'}}>Cerrar</button>
                        </div>
                    </div>
                )}
            </ReactModal>
        </div>
    );
};
