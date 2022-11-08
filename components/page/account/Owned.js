import React, { useState, useEffect, useRef } from "react";
import Card from "components/card";
import { useEthers } from "store/useEthers";
import axios from "axios";
import { StyledModal } from "./styled";
import { PrimaryButton } from "components/button";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { ethers } from "ethers";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function Owned() {
  const [state, setState] = useState({
    itemList: [],
    pageSize: 0,
    currentPage: 0,
    total: 0,
  });
  const { marketContract, NFTsContract, account } = useEthers();
  const isMounted = useRef(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    getNFTs();

    return () => (isMounted.current = false);
  }, [account]);

  const handleCancel = () => {
    setSelectedIndex(null);
  };

  const getItem = (rawItem) => {
    return new Promise(async (resolve, reject) => {
      if (rawItem.some((_e) => _e === undefined)) resolve(null);
      const [id, tokenId, nftAddress, price, owner, onSale] = rawItem;
      let uri = await NFTsContract.tokenURI(tokenId);
      let timeOut = true

      setTimeout(() => {
        if (timeOut) {
          resolve(null)
        }
      }, 4000)

      axios
        .get(uri)
        .then((result) => {
          timeOut = false;
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
          resolve(item);
        })
        .catch((err) => resolve(null));
    });
  };

  const getNFTs = async () => {
    try {
      const result = await marketContract.getMyNFTs(10, 1);
      const [rawItemList, pageSize, currentPage, total] = result;

      // console.log('rawItemList', rawItemList)
      if (result.some((e) => e === undefined)) return;
      let itemList = [];
      const promises = [];
      rawItemList.forEach((e) => promises.push(getItem(e)));
      Promise.all(promises).then((res) => {
        itemList = res.filter(e => e);

        isMounted.current &&
          setState({
            itemList: itemList,
            pageSize: pageSize.toString(),
            currentPage: currentPage.toString(),
            total: total.toString(),
          });
        setIsLoading(false);
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const sell = async () => {
    if (
      !inputRef.current.value ||
      isNaN(inputRef.current.value) ||
      inputRef.current.value <= 0
    )
      return setError(true);
    setError(false);
    const price = inputRef.current.value;
    const index = selectedIndex;
    const id = state.itemList[index].id;
    const result = await marketContract.sellItem(id, price);
    const receipt = await result.wait();

    for (const event of receipt.events) {
      if (event.event === "SellItem") {
        const newItemList = [...state.itemList];
        newItemList[index].onSale = true;

        setSelectedIndex(null);
        setState({
          ...state,
          itemList: newItemList,
        });
      }
    }
  };

  const cancel = (id) => {
    const item = state.itemList[id]
    const _id = ethers.BigNumber.from(item.id)

    marketContract.cancelSell(_id);
  }

  // console.log("state", state, state.itemList.length);
  return IsLoading ? (
    <Spin indicator={antIcon} tip="Processing..." className="block mx-auto" />
  ) : (
    <>
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 max-w-6xl mt-10 lg:mt-20 mx-auto">
          {state?.itemList?.map((e, i) => (
            <Card
              key={i}
              image={e?.metadata?.image}
              price={e?.price? ethers.utils.formatEther(e.price) : 0}
              name={e?.metadata?.name}
            >
              {!e?.onSale ? (
                <button
                  className="ml-auto block text-secondary mt-3"
                  onClick={() => {
                    setSelectedIndex(i);
                  }}
                >
                  Sale
                </button>
              ) : (
                <p className="text-right text-secondary mt-3" onClick={() => cancel(i)}>Cancel sell</p>
              )}
            </Card>
          ))}
        </div>
      </div>
      <StyledModal
        visible={selectedIndex !== null}
        onCancel={handleCancel}
        footer={null}
      >
        <p className="text-white text-lg text-center mb-5">
          How much you want to sell your NFT?
        </p>
        <div className="relative w-max block mx-auto">
          <input className="w-30 h-10 px-4" type="number" ref={inputRef} />
          <img
            src="images/home/icon-eth.png"
            className="w-10 absolute -right-10 top-0"
          />
        </div>
        {error && (
          <p className="text-red text-center mt-4">
            Enter decimal number and higher than 0{" "}
          </p>
        )}
        <PrimaryButton onClick={sell} className="block mx-auto mt-5">
          OK
        </PrimaryButton>
      </StyledModal>
    </>
  );
}
