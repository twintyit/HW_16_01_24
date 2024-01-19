import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const ShoppingBasket = () => {
    const [products, setProducts] = useState([]);
    const [totalSum, setTotalSum] = useState(0);

    const getSelectedItems = () => {
        return Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
    };

    useEffect(() => {
        CalculateTotalSum();
    }, [products]);

    useEffect(() => {
        const cartItems = getSelectedItems();
        setProducts(cartItems);
        CalculateTotalSum();
    }, []);

    const CalculateTotalSum = () => {
        const currentItems = getSelectedItems();
        let sum = 0;
        currentItems.forEach(item => {
            sum += item.price * item.quantity;
        });
        setTotalSum(sum);
    };

    const DeleteItem = async (item) => {
        const currentCart = getSelectedItems();
        const updatedCart = currentCart.filter(product => product.id !== item.id);
        Cookies.set('cart', JSON.stringify(updatedCart));
        setProducts(updatedCart);
        // CalculateTotalSum();
    };

    const ChangeQuantity = (item, symbol) => {
        const currentCart = getSelectedItems();
        const updatedCart = currentCart.map(product => {
            if (product.id === item.id) {
                if (product.quantity > 0 && symbol === '+') {
                    return { ...product, quantity: product.quantity + 1 };
                } else if (product.quantity > 1 && symbol === '-') {
                    return { ...product, quantity: product.quantity - 1 };
                }
            }
            return product;
        });

        Cookies.set('cart', JSON.stringify(updatedCart));
        setProducts(updatedCart);
        // CalculateTotalSum();
    };

    return (
        <>
            <div className="shopping-basket-container">
                <h2>Shopping basket</h2>
                <div className="items-container">
                    <ul>
                        {products && products.map((item) => (
                            <li className='selected-products' key={item.id}>
                                <img width={70} src={item.image} alt="" />
                                <div className="product-basket-info">
                                    <p>{item.title}</p>
                                    <h4>Total price:{item.price * item.quantity}$</h4>
                                    <div className="quantity">
                                        <button onClick={() => ChangeQuantity(item, '-')}>-</button>
                                        <p>Quantity:{item.quantity}</p>
                                        <button onClick={() => ChangeQuantity(item, '+')}>+</button>
                                    </div>
                                    <button onClick={() => DeleteItem(item)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <h3>Total sum: {totalSum.toFixed(2)}</h3>
            </div>
        </>
    );
};
