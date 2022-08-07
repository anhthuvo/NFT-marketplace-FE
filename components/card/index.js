import { useCallback, useEffect, useState } from "react";

const Card = ({ name, image, price, onSale, sell }) => {

  return (
    <div className="rounded-lg w-full bg-violet p-5">
      <div className="w-full relative overflow-hidden rounded-lg bg-white" style={{ paddingTop: "120%" }}>
        <img src={image} className="absolute top-0 left-0 w-full h-full object-cover" />
      </div>

      <div className="flex justify-between mt-4">
        <p className="text-white text-xl font-semi-bold">{name}</p>
        <div className="flex items-center">
          <p className="text-gray mr-3">{price}</p>
          <img src="images/home/icon-eth.png" className="w-5"/>
        </div>
      </div>
      { !onSale && <button className="ml-auto block text-secondary mt-3" onClick={sell}>Sale</button> }
    </div>
  );
};

export default Card;
