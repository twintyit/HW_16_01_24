import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ShoppingBasket from "./ShoppingBasket";
import ProductDetails from "./ProductDetails";

const NavPanel = () => {
    const linkStyle = {
        display: 'grid',
        color: 'white',
        width: '100%',
        height: '100%',
        justifyItems: 'center',
        alignItems: 'center',
    }

    return (
        <>
            <Router>
                <ul className="nav-panel">
                    <li className="nav-button"><Link style={linkStyle} to={"/"}>Home page</Link></li>
                    <li className="nav-button"><Link style={linkStyle} to={"/shopping-basket"}>Shopping basket</Link></li>
                </ul>
                <div className='container'>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/shopping-basket" element={<ShoppingBasket />}></Route>
                        <Route path="products/:id" element={<ProductDetails />}></Route>
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default NavPanel;