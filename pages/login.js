import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEthers } from "store/useEthers";
import GradientText from "components/GradientText";
import { SEO } from "components/SEO";

const Login = () => {
  const { connectMetaMask } = useEthers();

  return (
    <>
      <SEO title={"Connect wallet"}></SEO>
      <main className="bg-primary min-h-screen pt-20">
        <p className="text-white text-3xl mb-10 text-center ">
          Connect your wallet.
        </p>
        <div
          className="container max-w-sm py-3 px-10 border border-gray rounded-lg flex items-center cursor-pointer hover:bg-sky-700"
          onClick={connectMetaMask}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
            className="h-14"
          />
          <GradientText className="text-white text-center w-full text-2xl">
            Metamask
          </GradientText>
        </div>
      </main>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  const temp = await serverSideTranslations(locale, ["home"]);
  return {
    props: {
      ...temp,
    },
  };
};

export default Login;
