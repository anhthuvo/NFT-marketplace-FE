import React, { useState, useEffect, useRef } from "react";
import Card from "components/card";
import { useEthers } from "store/useEthers";
import axios from "axios";

export default function OnSale() {
  const [state, setState] = useState({
    itemList: [],
    pageSize: 0,
    currentPage: 0,
    total: 0,
  });
  const { marketContract, NFTsContract } = useEthers();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true
    getNFTs();

    return(() => isMounted.current = false)
  }, []);

  const getNFTs = async () => {
    try {
      const result = await marketContract.getOnSaleNFTs(10, 1);
      const [rawItemList, pageSize, currentPage, total] = result;

      if (result.some((e) => e === undefined)) return;
      const itemList = [];

      for (const e of rawItemList) {
        if (e.some((_e) => _e === undefined)) continue;

        const [id, tokenId, nftAddress, price, owner, onSale] = e;
        let uri = await NFTsContract.tokenURI(tokenId);
        const result = await axios.get(uri);
        let metadata = result.data;
        let item = {
          id: id.toString(),
          tokenId: tokenId.toString(),
          nftAddress: nftAddress.toString(),
          price: price.toString(),
          owner: owner.toString(),
          onSale,
          metadata,
        };
        // console.log(item);

        itemList.push(item);
      }

      // console.log(itemList);
      isMounted.current && setState({
        itemList: itemList,
        pageSize: pageSize.toString(),
        currentPage: currentPage.toString(),
        total: total.toString(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log("state", state.itemList);
  return (
    <div className="container pt-10 lg:pt-20">
      <p className="text-white text-4xl font-semibold text-center mb-10">NFTs On Sale</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 max-w-6xl mx-auto">
        {state?.itemList?.map((e, i) => (
          <Card
            key={i}
            image={e?.metadata?.image}
            price={e.price}
            name={e?.metadata?.name}
            onSale={true}
            sell={null}
          />
        ))}
      </div>
    </div>
  );
}