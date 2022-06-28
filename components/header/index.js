import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useWindowDimensions } from '../../utils'
import Hamburger from 'public/icons/hamburger.svg';
import HamburgerBlack from 'public/icons/hamburger-black.svg';
import Close from 'public/icons/close.svg';
import CloseBlack from 'public/icons/close-black.svg';
import Logo from 'public/icons/logo.svg';
import LogoWhite from 'public/icons/logo-white.svg';
import FaceBook from 'public/icons/facebook.svg';
import Youtube from 'public/icons/youtube.svg';
import Twitter from 'public/icons/twitter.svg';
import Instagram from 'public/icons/instagram.svg';
import Line from 'public/icons/line.svg';
import { Header, MobileMenu, DesktopMenu } from './styled';
import { PrimaryButton } from 'components/button'
const HeaderComponent = () => {
  const [hamburger, setHamburger] = useState(false);
  const { device } = useWindowDimensions();
  const router = useRouter();
  const { pathname, locale, route } = router;
  const isHomePage = pathname === '/' || pathname === '/ip';

  const handleShowHamburger = () => {
    setHamburger(!hamburger);
  };

  return (
    <>
      <Header
        className={`transition duration-300 ease-in-out transform `}
        device={device}>
        <div className="container relative flex flex-wrap items-center justify-between ">
          {device && device !== 'desktop' && <div></div>}
          <h1>
            <Link href={`${pathname === '/igg' ? '/igg' : '/'}`}>
              <a><LogoWhite /></a>
            </Link>
          </h1>
          <div className="flex items-center justify-end">
            {device && device !== 'desktop' ? (
              hamburger ? (
                !isHomePage ? (
                  <CloseBlack onClick={handleShowHamburger} />
                ) : (
                  <Close onClick={handleShowHamburger} />
                )
              ) : !isHomePage ? (
                <HamburgerBlack onClick={handleShowHamburger} />
              ) : (
                <Hamburger onClick={handleShowHamburger} />
              )
            ) : null}
            <MobileMenu
              placement="left"
              closable={false}
              onClose={handleShowHamburger}
              visible={hamburger}
              key="mobile-menu">
              <div>
              </div>
            </MobileMenu>
            <DesktopMenu className={`hidden lg:flex space-x-10`}>
              <p className={""}>Gallery</p>
              <PrimaryButton onClick={() => setIsSignup(true)}>Connnect</PrimaryButton>
              <img src="images/home/icon-user.png"/>
            </DesktopMenu>
          </div>
        </div>
      </Header>
    </>
  );
};

export default HeaderComponent;
