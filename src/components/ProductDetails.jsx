import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiClient from "../ApiClient";

const ProductDetails = () => {

    const { id } = useParams();
    const [currentProduct, setCurrentProduct] = useState(null);

    const fetchDataById = async () => {
        try {
            const api = new ApiClient('https://fakestoreapi.com');
            const responseData = await api.fetchProductById(id);
            setCurrentProduct(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDataById();
    }, [id]);

    return (
        <>
            <div>
                {currentProduct &&
                    <div className="product-details-container">
                        <img width={500} src={currentProduct.image} alt="" />
                        <div className="more">
                            <h2>{currentProduct.title}</h2>
                            <h3>{currentProduct.price}</h3>
                            <p>Description: {currentProduct.description}</p>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default ProductDetails;