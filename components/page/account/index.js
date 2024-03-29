import React, { useState } from "react";
import { SEO } from "components/SEO";
import Link from "next/link";
import Owned from "./Owned";
import Create from "./Create";
import Import from "./Import";
import { useEthers } from "store/useEthers";
import withAuth from "utils/withAuth";

function Account() {
  const [state, setState] = useState(0);
  const { network } = useEthers();

  const COMPONENTS = [
    {
      label: "Owned",
      component: <Owned />,
    },
    {
      label: "Create",
      component: <Create />,
    },
    // {
    //   label: "Import",
    //   component: <Import />,
    // },
  ];
  return (
    <div className="py-20 lg:pt-32 h-full">
      <SEO title={"My profile"}></SEO>
      <div className="container">
        {network.chainId === 80001 ? (
          <p className="text-white text-base text-right mb-10 capitalize">
            Network: {network.name}
          </p>
        ) : (
          <p className="text-red text-base text-right mb-10 capitalize">
            Please connect to Mumbai testnet
          </p>
        )}
        <div className="rounded-full py-2 px-5 bg-gray-100 flex w-max space-x-2 mx-auto mb-10 lg:mb-20">
          {COMPONENTS.map((e, index) => (
            <div
              key={index}
              className={`rounded-full w-20 py-2 text-center text-white cursor-pointer ${
                state === index ? "bg-violet-100" : ""
              }`}
              onClick={() => setState(index)}
            >
              {e.label}
            </div>
          ))}
        </div>
      </div>
      {COMPONENTS[state].component}
    </div>
  );
}

export default Account;
