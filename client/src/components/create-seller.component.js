import React, { Component } from 'react';
import axios from 'axios';

export default class CreateSeller extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const seller = {
            username: this.state.username
        }

        console.log(seller);

        axios.post('http://localhost:5000/sellers/add', seller)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        })
        window.location = '/sellers';
    }

    render() {
        return (
            <div>
                <h3>Create New Seller</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Seller" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}