'use client';
import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000
    },
};

export const Headers = ({
    allProducts,
    setAllProducts,
    total,
    countProducts,
    setCountProducts,
    setTotal,
}) => {
    const [active, setActive] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [confirmAction, setConfirmAction] = useState(() => () => {});

    useEffect(() => {
        ReactModal.setAppElement('#cart-container');
    }, []);

    useEffect(() => {
        if (productToDelete !== null) {
            console.log('Product to delete has been set:', productToDelete);
            openModal("¿Estás seguro de que quieres eliminar este artículo del carrito?", confirmDelete, "Confirmación de Eliminación");
        }
    }, [productToDelete]);

    const openModal = (message, action, title) => {
        setModalMessage(message);
        setConfirmAction(() => action);
        setModalTitle(title);
        setIsOpen(true);
    };

    const closeModal = () => {
        console.log('Closing modal ejecutandose');
        setIsOpen(false);
        setProductToDelete(null);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            console.log('Product to delete:', productToDelete); // Debugging
            const results = allProducts.filter(item => item.id !== productToDelete.id);
            setTotal(total - productToDelete.price * productToDelete.quantity);
            setCountProducts(countProducts - productToDelete.quantity);
            setAllProducts(results);
            closeModal();
        } else {
            console.log('Product to delete is still null');
        }
    };

    const onDeleteProduct = (product) => {
        setProductToDelete(product); // Set the product to delete
        openModal("¿Estás seguro de que quieres eliminar este artículo del carrito?", confirmDelete, "Confirmación de Eliminación");
    };

    const onCleanCart = () => {
        openModal("¿Estás seguro de que quieres vaciar el carrito?", () => {
            setAllProducts([]);
            setTotal(0);
            setCountProducts(0);
            closeModal();
        }, "Confirmación de Vacío de Carrito");
    };

    return (
        <header>
            <h1>Tienda de tecnología, software y hardware.</h1>
            <div className='container-icon'>
                <div className='container-cart-icon' onClick={() => setActive(!active)}>
                    <img src="/cart.svg" alt="carrito" className="icon-cart" />
                    <div className='count-products'>
                        <span id='contador-productos'>{countProducts}</span>
                    </div>
                </div>
                <div id="cart-container" className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
                    {allProducts.length ? (
                        <>
                            <div className='row-product'>
                                {allProducts.map(product => (
                                    <div className='cart-product' key={product.id}>
                                        <div className='info-cart-product'>
                                            <span className='cantidad-producto-carrito'>{product.quantity}</span>
                                            <img src={product.urlImage} alt={product.title} className='imagen-producto-carrito' />
                                            <p className='titulo-producto-carrito'>{product.title}</p>
                                            <span className='precio-producto-carrito'>${product.price}</span>
                                        </div>
                                        <img
                                            src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                                            alt="cerrar"
                                            className="icon-close"
                                            onClick={() => onDeleteProduct(product)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='cart-total'>
                                <h3>Total:</h3>
                                <span className='total-pagar'>${total}</span>
                            </div>
                            <button className='btn-clear-all' onClick={onCleanCart}>
                                Vaciar Carrito
                            </button>
                        </>
                    ) : (
                        <p className='cart-empty'>El carrito está vacío</p>
                    )}
                </div>
                <ReactModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel={modalTitle}
                >
                    <h2>{modalTitle}</h2>
                    <p>{modalMessage}</p>
                    <button onClick={confirmAction} className="button-confirm">Sí</button>
                    <button onClick={closeModal} className="button-cancel">No</button>
                </ReactModal>
            </div>
        </header>
    );
};
