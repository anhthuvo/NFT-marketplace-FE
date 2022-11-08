import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Header, MobileMenu, DesktopMenu } from "./styled";
import { PrimaryButton } from "components/button";
import { useEthers } from "store/useEthers";

const HeaderComponent = () => {
  const router = useRouter();
  const { pathname, locale, route } = router;
  const { connectMetaMask, account } = useEthers();

  return (
    <>
      <Header className={""}>
        <div className="bg"></div>
        <div className="container relative flex flex-wrap items-center justify-between ">
          <h1
            className="text-3xl text-white font-bold cursor-pointer"
            onClick={() => router.push("/", undefined, { shallow: true })}
          >
            Everly
          </h1>
          <div className="lg:flex items-center justify-end mt-0">
            <DesktopMenu
              className={`flex items-center space-x-10 lg:space-y-0`}
            >
              <PrimaryButton onClick={() => connectMetaMask()}>
                {account
                  ? `...${account.slice(account.length - 5, account.length)}`
                  : "Connnect"}
              </PrimaryButton>
              {account && (
                <div
                  onClick={() =>
                    router.push("/account", undefined, { shallow: true })
                  }
                >
                  <img
                    src="https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99004.jpg?w=2000"
                    className="w-10 h-10 rounded-full "
                  />
                </div>
              )}
            </DesktopMenu>
          </div>
        </div>
      </Header>
    </>
  );
};

export default HeaderComponent;
