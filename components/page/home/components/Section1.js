import React, { useRef, useEffect, useState } from "react";
import { PrimaryButton } from "components/button";
import styled from 'styled-components';
import GradientText from 'components/GradientText';
import { useRouter } from "next/router";

export default function Section1() {
  const router = useRouter()
  
  return (
    <div
      className="w-full h-full bg-no-repeat bg-cover py-24 lg:py-20"
      style={{ background: 'url("images/home/bg_section1.png")' }}
    >
      <div className="container h-full">
        <div className="grid md:grid-cols-2 items-center h-full w-full">
          <div className="">
            <h1 className="text-2xl md:text-6xl font-semibold capitalize text-white">
              Collect your
              <br />
              digital art {' '}
              <GradientText>NFTs</GradientText>
            </h1>
            <p className="text-gray mb-5">
              Marketplace for monster charater collections <br />
              non fungible token NFTs
            </p>
            <PrimaryButton onClick={() => {router.push('/gallery')}} className="mr-10 mb-5 md:mb-0">
              Gallery
            </PrimaryButton>
            <PrimaryButton outline onClick={() => {}}>
              Create Your
            </PrimaryButton>
            <div className="flex items-center w-full max-w-md mt-5 md:mt-10 -ml-5 md:-ml-10">
              <div className="w-1/3 pl-5 md:pl-10 border-r border-white">
                <h1 className="text-xl md:text-3xl font-semibold capitalize text-white">
                  721
                </h1>
                <p className="text-base font-light capitalize text-white">
                  NFTs
                </p>
              </div>
              <div className="w-1/3 pl-5 md:pl-10 border-r border-white">
                <h1 className="text-xl md:text-3xl font-semibold capitalize text-white">
                  8454
                </h1>
                <p className="text-base font-light capitalize text-white">
                  Artists
                </p>
              </div>
              <div className="w-1/3 pl-5 md:pl-10">
                <h1 className="text-xl md:text-3xl font-semibold capitalize text-white">
                  8454
                </h1>
                <p className="text-base font-light capitalize text-white">
                  Autions
                </p>
              </div>
            </div>
          </div>
          <div className=" relative items-center">
            <Circle/>
            <img
              className="md:w-full z-10"
              src="images/home/section1.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Circle = styled.div`
padding-top: 75%;
border-radius: 50%;
width: 75%;
background-color: ${({ theme }) => theme.colors.light};
position: absolute;
top: 50%;
left:50%;
transform: translate(-50%, -60%);
z-index: -1;
box-shadow: 00px 0px 20px 12px ${({ theme }) => theme.colors['light-50']};

`