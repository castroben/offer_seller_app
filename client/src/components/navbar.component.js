import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">OfferTracker</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Offers</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/sellers" className="nav-link">Sellers</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create-offer" className="nav-link">Create Offer</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create-seller" className="nav-link">Create Seller</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}