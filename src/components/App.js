import React, { Component } from "react";
import * as API from "../services/api.js";
import GoodsList from './GoodsList';
import Modal from './Modal'

export default class App extends Component {

    state = {
        data: [],
        isModalOpen: false,
        name: "",
        category: "",
        price: ""
    };

    componentDidMount () {
        this.loadData()
    };
 
    loadData() {
        API.getAllGoodsItems().then(goods => {
            this.initialData = goods;
            this.setState({
                data: this.initialData
            })
        })
    };

    openModal = (n, cat, pr) => {
        this.setState({ 
            isModalOpen: true,
            name: n,
            category: cat,
            price: pr
        });
    }

    closeModal = () => this.setState({ isModalOpen: false });

    render() {
        const { data, isModalOpen, name, category, price } = this.state;
        return (
            <>
                {isModalOpen && <Modal name={name} category={category} price={price} closeModal={this.closeModal} />}
                <GoodsList data={data} openModal={this.openModal} />
            </>
        )
    }
}
