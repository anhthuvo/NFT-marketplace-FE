import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Homepage from 'components/page/home';
const Home = () => {
  return (
    <>
      <main className="bg-black-300">
        <Homepage />
      </main>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  const temp = await serverSideTranslations(locale, ['home']);
  return {
    props: {
      ...temp
    }
  };
};

export default Home;
