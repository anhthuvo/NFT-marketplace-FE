import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { ethers } from "ethers";
import { abi as NFTAbi } from 'api/NFT';
import { abi as MarketplaceAbi } from 'api/Marketplace';

const EthersContext = createContext({});

const initialState = {
  account: "",
};

const EtherslProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [Web3Provider, setWeb3Provider] = useState(null);
  const [NFTsContract, setNFTsContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setWeb3Provider(provider)
    window.ethereum.on('accountsChanged', function (accounts) {
        let acc = accounts[0]
        setState({
            ...state,
            account: acc,
          });
    })

    const NFTsContract = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_ADDRESS, NFTAbi, provider);
    const marketContract = new ethers.Contract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, MarketplaceAbi, provider);

    setNFTsContract(NFTsContract)
    setMarketContract(marketContract)
  }, [])

  const connectMetaMask = async () => {
    const accounts = await Web3Provider.send("eth_requestAccounts", []);

    if (accounts) {
        setState({
            ...state,
            account: accounts[0],
          });
    }
  };
  return (
    <EthersContext.Provider
      value={{
        account: state.account,
        Web3Provider,
        NFTsContract,
        marketContract,
        connectMetaMask,
      }}
    >
      {children}
    </EthersContext.Provider>
  );
};

export const useEthers = () => useContext(EthersContext);

export default EtherslProvider;
