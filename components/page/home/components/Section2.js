import React, { useRef, useEffect, useState } from "react";
import { PrimaryButton } from "components/button";
import styled from "styled-components";
import GradientText from "components/GradientText";

export default function Section2() {
  return (
    <div className="container h-full py-20">
      <div className="h-full flex justify-between flex-col">
        <div className="flex flex-col md:flex-row w-full justify-center">
          <div className="relative max-w-md pr-20">
            <img
              className="h-2/3 rounded-lg z-10 ml-auto"
              src="images/home/section2.webp"
            />
            <Rec />
          </div>
          <div className="">
            <h1 className="text-2xl md:text-5xl font-semibold capitalize text-white">
              Let drive into
              <br />
              the world of NFTs
            </h1>
            <p className="text-gray mb-5">
              Join our mailing list to stay in the loop <br />
              with our newest feature releases, NFT drops, and tips.
            </p>
            <PrimaryButton onClick={() => {}} className="mr-10 mb-5 md:mb-0">
              Read more
            </PrimaryButton>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white text-center mb-14">
            Create and sell your NFTs
          </h1>
          <div className="grid md:grid-cols-3 mb-12 -mx-10">
            <div className="text-center px-10">
              <img className="mx-auto h-12" src="images/home/icon-wallet.png" />
              <p className="text-white text-2xl">Set up your wallet</p>
              <p className="text-gray text-base max-w-sm mx-auto">
                Once you’ve set up your wallet of choice, connect it to OpenSea
                by clicking the wallet icon in the top right corner.
              </p>
            </div>
            <div className="text-center px-10">
              <img className="mx-auto h-12" src="images/home/icon-photo.png" />
              <p className="text-white text-2xl">Add your NFTs</p>
              <p className="text-gray text-base max-w-sm mx-auto">
                Upload your work (image, video, audio, or 3D art), add a title
                and description, and customize your NFTs with properties, stats,
                and unlockable content.
              </p>
            </div>
            <div className="text-center px-10">
              <img className="mx-auto h-12" src="images/home/icon-tag.png" />
              <p className="text-white text-2xl">List them for sale</p>
              <p className="text-gray text-base max-w-sm mx-auto">
                Choose between auctions, fixed-price listings, and
                declining-price listings. You choose how you want to sell your
                NFTs, and we help you sell them!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Rec = styled.div`
  border-radius: 10px;
  width: 72%;
  padding-top: 70%;
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: -1;
  box-shadow: 0px 0px 20px 12px ${({ theme }) => theme.colors.secondary};
  border-width: 1px;
  border-color: white;
`;
