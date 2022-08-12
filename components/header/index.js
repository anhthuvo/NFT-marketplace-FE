import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Header, MobileMenu, DesktopMenu } from "./styled";
import { PrimaryButton } from "components/button";
import { useEthers } from "store/useEthers";

const HeaderComponent = () => {
  const [hamburger, setHamburger] = useState(false);
  const router = useRouter();
  const { pathname, locale, route } = router;
  const isHomePage = pathname === "/";
  const { connectMetaMask, account } = useEthers();
  const handleShowHamburger = () => {
    setHamburger(!hamburger);
  };

  return (
    <>
      <Header className={`transition duration-300 ease-in-out transform`}>
        <div className="container relative flex flex-wrap items-center justify-between ">
          <h1
            className="text-3xl text-white font-bold cursor-pointer"
            onClick={() => router.push("/", undefined, { shallow: true })}
          >
            Everly
          </h1>
          <div className="flex items-center justify-end">
            <DesktopMenu className={`hidden lg:flex space-x-10`}>
              <p
                className={pathname.includes("/gallery") ? "active" : ""}
                onClick={() =>
                  router.push("/gallery", undefined, { shallow: true })
                }
              >
                Gallery
              </p>
              <PrimaryButton onClick={() => connectMetaMask()}>
                {account? `...${account.slice(account.length -5, account.length)}` : 'Connnect' }
              </PrimaryButton>
              <div
                onClick={() =>
                  router.push("/account", undefined, { shallow: true })
                }
              >
                {account ? (
                  <img
                    src="https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99004.jpg?w=2000"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <img src="images/home/icon-user.png" />
                )}
              </div>
            </DesktopMenu>
          </div>
        </div>
      </Header>
    </>
  );
};

export default HeaderComponent;
