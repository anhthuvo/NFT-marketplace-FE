import React from 'react';
import Image from 'components/Image';
import { Section, Section6, IframeWrapper, Animation } from './styled';
import { PrimaryButton } from 'components/button';
import { useTranslation } from 'next-i18next';
import { SEO } from 'components/SEO';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Link from 'next/link';
import { useWebp, useWindowDimensions } from '../../../utils';

export default function Home() {
  const { t } = useTranslation('home');
  const webp = useWebp();
  const extendFile = webp ? '.webp' : '.png';
  const { width: windowWidth, height: windowHeigh, device } = useWindowDimensions();
  const refSection3 = React.useRef();

  return (
    <div className="bg-white">
      <SEO title={t('seo.title')} description={t('seo.description')} url={t('seo.url')}></SEO>
      {/* SECTION 2 */}
      <Fade>
        <div className="section py-16 md:py-20 relative bg-black">
          <div className="container text-center flex justify-center">
            <div style={{ maxWidth: '618px' }}>
              <h3 className="uppercase text-primary mb-4 text-xl md:text-2xl">
                {t('section2.title')}
              </h3>
              <span
                style={{ maxWidth: '650px' }}
                className="text-gray-400 lg:text-white mb-2 text-base md:text-lg">
                {t('section2.desc_line1')}
              </span>
              <br className="hidden md:inline" />
              <span
                style={{ maxWidth: '650px' }}
                className="text-gray-400 lg:text-white mb-2 md:text-lg">
                {' '}
                {t('section2.desc_line2')}
              </span>
            </div>
          </div>
        </div>
      </Fade>
      {/* SECTION 2 */}
      {/* SECTION 5 */}
      <div className="section bg-black">
        <Section
          image={`/images/home/banner4${device !== 'desktop' ? 'mobile' : 'desktop'}${extendFile}`}>
          <div className="container w-full h-full text-center py-16 relative">
            <h1 className="text-gray mb-4 lg:mb-0 text-3xl md:text-4xl w-52 w-auto mx-auto capitalize">
              {t('section5.title1')}
            </h1>
            <p className="text-primary w-full text-xl md:text-2xl mx-auto capitalize">
              {t('section5.desc')}
            </p>
          </div>
        </Section>
      </div>
      {/* SECTION 5 */}
      {/* SECTION 7 */}
      <section ref={refSection3} className="pb-0 md:pb-10 lg:bg-light bg-transparent flex flex-col">
        {/* IMAGE FRAME */}
        <div className="container px-0 lg:px-4 lg:space-y-4 lg:order-2">
          <div className="grid lg:grid-cols-3 gap-0 lg:gap-4">
            <Zoom>
              <div className="col-span-2 lg:col-span-1">
                <Image className="w-full h-full object-cover" src={'/images/home/banner6a.png'} />
              </div>
            </Zoom>
            <Zoom>
              <div className="col-span-2">
                <Image className="w-full h-full object-cover" src={'/images/home/banner6b.png'} />
              </div>
            </Zoom>
          </div>
          <div className="grid lg:grid-cols-3 gap-0 lg:gap-4">
            <Zoom>
              <div className="col-span-2">
                <Image className="w-full h-full object-cover" src={'/images/home/banner6c.png'} />
              </div>
            </Zoom>
            <Zoom>
              <div className="col-span-2 lg:col-span-1">
                <Image className="w-full h-full object-cover" src={'/images/home/banner6d.png'} />
              </div>
            </Zoom>
          </div>
          <Link href="/gallery">
            <p className="bg-white-200 lg:bg-transparent black text-center underline text-xl md:text-2xl cursor-pointer py-4 capitalize">
              {t('section7.See_more')}
            </p>
          </Link>
        </div>
        {/* IMAGE FRAME */}
        {/* ADVERTISE */}
        <div className="container py-16 md:py-20 bg-white lg:bg-transparent lg:order-1">
          <div className="flex flex-col lg:flex-row -my-6 lg:my-0 mx-0 w-full">
            <div className="w-full lg:w-1/3 lg:pr-10 py-8 md:py-10 lg:py-0">
              <p className="mb-4 text-xl md:text-2xl uppercase md:capitalize">
                {t('section7.title1')}
              </p>
              <p className="text-base md:text-lg">{t('section7.desc1')}</p>
            </div>
            <div className="w-full lg:w-1/3 lg:px-10 py-6 md:py-10 lg:py-0 lg:border-r lg:border-l border-silver">
              <p className="mb-4 text-xl md:text-2xl uppercase md:capitalize">
                {t('section7.title2')}
              </p>
              <p className="text-base md:text-lg">{t('section7.desc2')}</p>
            </div>
            <div className="w-full lg:w-1/3 lg:pl-10 py-6 md:py-10 lg:py-0">
              <p className="mb-4 text-xl md:text-2xl uppercase md:capitalize">
                {t('section7.title3')}
              </p>
              <p className="text-base md:text-lg">{t('section7.desc3')}</p>
            </div>
          </div>
        </div>
        {/* ADVERTISE */}
      </section>
      {/* SECTION 7 */}
    </div>
  );
}
