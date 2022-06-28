import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from 'public/icons/logo.svg';
import { SectionLast, Footer } from './styled';
import { PrimaryButton as Button } from 'components/button';

const FooterComponent = () => {
  const { pathname, locale, route } = useRouter();
  const isJapn = locale === 'jp';
  const isIGG = pathname === '/igg' && !isJapn;
  const isContactUs = pathname === '/contact-us';
  const isStudio = route === '/studio/[cartId]/[itemId]/[step]';
  const isStudioList = route === '/studio';
  const isLogin = route === '/login' || route === '/signup';
  const isCart = route === '/cart/[step]';
  const isAccount = route.includes('/account/');
  const isShow = isStudioList || isLogin || isCart || isAccount;

  if (isStudio) return null;
  return (
    <>
      {/* SECTION */}
      <div className={`section ${isIGG || isContactUs || isStudio ? 'hidden' : ''}`}>
        <SectionLast className={isShow ? 'hidden' : ''}>
          <div className="relative bg-light section-logo py-32 md:py-36">
            <div className="container">
              <p>
                <a className="flex justify-center my-3 my-8">
                  <Logo />
                </a>
              </p>
              <div className="flex justify-center">
              </div>
            </div>
          </div>
        </SectionLast>
      </div>
      {/* SECTION */}
      <Footer className="relative bg-black">
        <div
          className={`container py-10 grid grid-cols-1 ${isIGG ? 'lg:grid-cols-1' : 'lg:grid-cols-2'
            } text-center gap-4 text-gray-200 text-base lg:text-xl`}>
          <div
            className={`flex flex-col justify-center items-center ${isIGG ? 'lg:items-center' : 'lg:items-start'
              } space-y-8"`}>
            <div className="flex space-x-8 md:space-x-16 mb-10">
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default FooterComponent;
