import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Offer = props => (
    <tr>
        <td>{props.offer.sellerUsername}</td>
        <td>{props.offer.description}</td>
        <td>{props.offer.price}</td>
        <td>{props.offer.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.offer._id}>edit</Link> | <a href="#" onClick={() => { props.deleteOffer(props.offer._id) }}>delete</a>
        </td>
    </tr>
)

export default class OffersList extends Component {
    constructor(props) {
        super(props);

        this.deleteOffer = this.deleteOffer.bind(this)

        this.state = {offers: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/offers/')
            .then(response => {
                this.setState({ offers: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteOffer(id) {
        axios.delete('http://localhost:5000/offers/'+id)
            .then(response => { console.log(response.data)});

        this.setState({
            offers: this.state.offers.filter(el => el._id !== id)
        })
    }

    offersList() {
        return this.state.offers.map(currentOffer => {
            return <Offer offer={currentOffer} deleteOffer={this.deleteOffer} key={currentOffer._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Offers</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Seller Username</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.offersList() }
                    </tbody>
                </table>
            </div>
        )
    }
}