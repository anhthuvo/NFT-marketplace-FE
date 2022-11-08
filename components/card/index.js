import { useCallback, useEffect, useState } from "react";

const Card = ({ name, image, price, children }) => {
  return (
    <div className="rounded-lg w-full bg-violet p-5">
      <div
        className="w-full relative overflow-hidden rounded-lg bg-white"
        style={{ paddingTop: "120%" }}
      >
        <img
          src={image}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-between mt-4 items-start">
        <p className="text-white text-lg font-semi-bold pr-4 h-14 text-ellipsis overflow-hidden">
          {name}
        </p>
        <div className="flex items-center">
          <p className="text-gray mr-3">{price}</p>
          <img src="images/home/icon-eth.png" className="w-5" />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Card;
