import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

const Seller = props => (
    <tr>
        <td>{props.seller.username}</td>
        <td>
            <a href="#" onClick={() => {props.deleteSeller(props.seller._id)}}>delete</a>
        </td>
    </tr>
)

export default class SellersList extends Component{
    constructor(props) {
        super(props);
        this.deleteSeller = this.deleteSeller.bind(this);
        this.state = {sellers : []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/sellers/')
            .then(response => {
                this.setState({sellers:response.data})
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteSeller(id){
        axios.delete('http://localhost:5000/sellers/'+id)
            .then(response => {console.log(response.data)});

        this.setState({
            sellers: this.state.sellers.filter(el => el._id !== id)
        });
    }

    sellersList(){
        return this.state.sellers.map(currentSeller => {
            return <Seller seller={currentSeller} deleteSeller={this.deleteSeller} key={currentSeller._id}/>;
        });
    }

    render(){
        return (
            <div>
                <h3>Logged Sellers</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.sellersList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
