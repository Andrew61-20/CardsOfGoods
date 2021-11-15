import React from "react";
import s from './GoodsData.module.css';


export default ({good, openModal}) => {
	return (
      <div className={s.block}>
        <div className={s.listInBlock}>
          <div className={s.goodName}>
            <span className={s.typeOfGood}>{good.category}</span>
            <span className={s.nameOfGood}>{good.name}</span>
          </div>
          <div className={s.goodPrice}>
            <span className={s.digitOfPrice}>{good.price}</span>
            <button className={s.butForBuy} onClick={() => openModal(good.name, good.category, good.price)}>buy</button>
          </div>
        </div>
      </div>
    );
}