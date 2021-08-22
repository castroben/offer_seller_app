import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import OffersList from "./components/offers-list.component";
import EditOffer from "./components/edit-offer.component";
import CreateOffer from "./components/create-offer.component";
import CreateSeller from "./components/create-seller.component";
import SellersList from "./components/sellers-list.component";

function App() {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <br/>
                <Route path="/" exact component={OffersList} />
                <Route path="/sellers" component={SellersList} />
                <Route path="/edit/:id" component={EditOffer} />
                <Route path="/create-offer" component={CreateOffer} />
                <Route path="/create-seller" component={CreateSeller} />
            </div>
        </Router>
    );
}

export default App;