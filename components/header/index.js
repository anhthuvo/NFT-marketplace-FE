import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useWindowDimensions } from "../../utils";
import { Header, MobileMenu, DesktopMenu } from "./styled";
import { PrimaryButton } from "components/button";

const HeaderComponent = () => {
  const [hamburger, setHamburger] = useState(false);
  const { device } = useWindowDimensions();
  const router = useRouter();
  const { pathname, locale, route } = router;
  const isHomePage = pathname === "/";

  const handleShowHamburger = () => {
    setHamburger(!hamburger);
  };

  return (
    <>
      <Header className={`transition duration-300 ease-in-out transform`}>
        <div className="container relative flex flex-wrap items-center justify-between ">
          <Link href="/">
            <h1 className="text-3xl text-white font-bold cursor-pointer">
              Everly
            </h1>
          </Link>
          <div className="flex items-center justify-end">
            <DesktopMenu className={`hidden lg:flex space-x-10`}>
              <p className={pathname.includes("/gallery") ? "active" : ""}>
                Gallery
              </p>
              <PrimaryButton onClick={() => setIsSignup(true)}>
                Connnect
              </PrimaryButton>
              <Link href="/account">
                <img src="images/home/icon-user.png" />
              </Link>
            </DesktopMenu>
          </div>
        </div>
      </Header>
    </>
  );
};

export default HeaderComponent;
