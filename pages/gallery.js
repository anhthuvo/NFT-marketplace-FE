import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GalleryPage from 'components/page/gallery';

const Gallery = () => {
  return (
    <>
      <main className="min-h-screen bg-primary">
        <GalleryPage />
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

export default Gallery;
