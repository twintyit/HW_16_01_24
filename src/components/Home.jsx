import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import ApiClient from "../ApiClient"
import Cookies from 'js-cookie';

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const linkStyle = {
        width: '100%',
        height: '100%',
        display: 'block',
    }

    const fetchData = async () => {
        try {
            const api = new ApiClient('https://fakestoreapi.com');
            const responseData = await api.fetchData('products');
            setData(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addToBasket = (item) => {
        item.quantity = item.quantity || 1;
        const currentCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
        const addedItem = currentCart.find((cartItem) => cartItem.id === item.id);

        if (!addedItem) {
            const updatedCart = [...currentCart, item];
            Cookies.set('cart', JSON.stringify(updatedCart));
        } else {
            addedItem.quantity++;
            Cookies.set('cart', JSON.stringify(currentCart));
        }
    };

    return (
        <div>
            {(<ul className='products-container'>
                {data && data.map((item) => (
                  
                        <li className='product' key={item.id}>
                            <h4>{item.title}</h4>
                            <img height={250} width={200} src={item.image} alt="" />
                            <p>{item.price}$</p>
                        <Link style={{ padding: '10px' }} to={`products/${item.id}`}>More</Link>
                            <button className='button-add' onClick={() => addToBasket(item)}>Add to card</button>
                        </li>
            ))}
        </ul>)
}
        </div >
    );

}
export default Home;

