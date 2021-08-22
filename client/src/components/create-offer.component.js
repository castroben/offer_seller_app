import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateOffer extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            sellerUsername: '',
            description: '',
            price: 0,
            date: new Date(),
            sellerUsernames: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/sellers/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        sellerUsernames: response.data.map(seller => seller.username),
                        sellerUsername: response.data[0].username
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeUsername(e) {
        this.setState({
            sellerUsername: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const offer = {
            sellerUsername: this.state.sellerUsername,
            description: this.state.description,
            price: this.state.price,
            date: this.state.date
        }

        console.log(offer);

        axios.post('http://localhost:5000/offers/add', offer)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Offer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.sellerUsername}
                                onChange={this.onChangeUsername}>
                            {
                                this.state.sellerUsernames.map(function(sellerUsername) {
                                    return <option
                                        key={sellerUsername}
                                        value={sellerUsername}>{sellerUsername}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price (in dollars): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Offer" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}