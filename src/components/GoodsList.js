import React from "react";
import GoodsData from "./GoodsData";
import s from './GoodsList.module.css';

export default ({data, openModal}) => {
    if(!data) {return (<p>Loading...</p>);}

    let arr = [], minPrice, minName, minCategory;
    
    data.map(good => {
        arr.push(good.price);
        if(good.price === Math.min(...arr)) {
            minPrice = good.price;
            minName = good.name;
            minCategory = good.category
        }
    })

    const goods = data.map((good, index) => {
        return (
            <GoodsData good={good} 
                       key={`user-${index}`}
                       openModal={openModal}
            />
        )
    });

    return (
        <div className={s.squareOfGoods}>
            {goods}
            <button className={s.butCheapest} onClick={() => openModal(minName, minCategory, minPrice)}>Buy cheapest</button>
        </div>
    );
}