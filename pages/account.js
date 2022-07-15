import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Account from 'components/page/account';

const _Account = () => {
  return (
    <>
      <main className="min-h-screen bg-primary">
        <Account />
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

export default _Account;
