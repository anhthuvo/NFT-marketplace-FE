import React, { useState, useEffect, useRef } from "react";
import Card from "components/card";
import { useEthers } from "store/useEthers";
import axios from "axios";
import { PrimaryButton } from "components/button";
import { ethers } from "ethers";

export default function OnSale() {
  const [state, setState] = useState({
    itemList: [],
    pageSize: 0,
    currentPage: 0,
    total: 0,
  });
  const { marketContract, NFTsContract, account } = useEthers();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    getNFTs();

    return () => (isMounted.current = false);
  }, [marketContract]);

  const getNFTs = async () => {
    if (!marketContract) return
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
        let totalPrice = price.div(100).add(price)

        let item = {
          id: id.toString(),
          tokenId: tokenId.toString(),
          nftAddress: nftAddress.toString(),
          price: totalPrice,
          owner: owner.toString(),
          onSale,
          metadata,
        };
        // console.log(item);

        itemList.push(item);
      }

      // console.log(itemList);
      isMounted.current &&
        setState({
          itemList: itemList,
          pageSize: pageSize.toString(),
          currentPage: currentPage.toString(),
          total: total.toString(),
        });
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        itemList: [],
      });
    }
  };

  const purchase = async (id) => {
    const item = state.itemList[id]
    const _id = ethers.BigNumber.from(item.id)

    console.log('item.price', item.price.toString())
    const result = await marketContract.purchaseNFT( _id, { value: item.price });
    const receipt = await result.wait()
    for (const event of receipt.events) {
      if (event.event !== "PurchaseItem") {
        continue;
      }
      getNFTs()
    }
  };

  return (
    <div className="container pt-10 lg:pt-20">
      <p className="text-white text-4xl font-semibold text-center mb-10">
        NFTs On Sale
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 max-w-6xl mx-auto">
        {state?.itemList?.map((e, i) => (
          <Card
            key={i}
            image={e?.metadata?.image}
            price={ethers.utils.formatEther(e.price)}
            name={e?.metadata?.name}
          >
            {account !== e.owner.toLowerCase() && (
              <PrimaryButton
                className="block ml-auto"
                onClick={() => purchase(i)}
              >
                Buy
              </PrimaryButton>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
