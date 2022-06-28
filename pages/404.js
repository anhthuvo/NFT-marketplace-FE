import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  }, []);
  return <h1>404</h1>;
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [home]))
  }
});

export default Custom404;
