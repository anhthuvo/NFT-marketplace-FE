import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { ethers } from "ethers";
import { abi as NFTAbi } from "api/NFT";
import { abi as MarketplaceAbi } from "api/Marketplace";
import { useRouter } from "next/router";

const EthersContext = createContext({});

const initialState = {
  account: "",
};

const EtherslProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const Web3Provider = useRef(null);
  const [NFTsContract, setNFTsContract] = useState(null);
  const [Network, setNetwork] = useState({ 
    chainId: '', 
    ensAddress: '', 
    name: '' 
  });
  const MarketContract = useRef(null);
  const router = useRouter()

  useEffect(() => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
    );
    Web3Provider.current = provider;

    const NFTsContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_ADDRESS,
      NFTAbi,
      provider
    );
    setNFTsContract(NFTsContract);

    detectMetamask()

    window.ethereum.on("accountsChanged", function (accounts) {
      detectMetamask()
    });

    Web3Provider.current.on("network", (newNetwork, oldNetwork) => {
      setNetwork(newNetwork)
    })
  }, []);

  const connectMetaMask = async () => {
    if (!Web3Provider.current) return;
    window.ethereum.request({
      method: "eth_requestAccounts",
    });
  };

  const detectMetamask = async () => {
    if (!Web3Provider.current) return;
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    setState({
      ...state,
      account: accounts[0],
    });
    if (accounts[0]) {
      const marketContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
        MarketplaceAbi,
        Web3Provider.current
      );
      const signer = Web3Provider.current.getSigner();
      const marketContractWithSigner = marketContract.connect(signer);
      MarketContract.current = marketContractWithSigner;
    }
    else if (router.pathname.includes('account')) {
      router.push('/')
    }
  }

  return (
    <EthersContext.Provider
      value={{
        account: state.account,
        Web3Provider: Web3Provider.current,
        NFTsContract,
        marketContract: MarketContract.current,
        connectMetaMask,
        network: Network
      }}
    >
      {children}
    </EthersContext.Provider>
  );
};

export const useEthers = () => useContext(EthersContext);

export default EtherslProvider;
