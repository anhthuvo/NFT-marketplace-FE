import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";

const EthersContext = createContext({});

const initialState = {
  account: "",
};

const EtherslProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [Web3Provider, setWeb3Provider] = useState(null);
  const router = useRouter();

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
        ...state,
        connectMetaMask,
      }}
    >
      {children}
    </EthersContext.Provider>
  );
};

export const useEthers = () => useContext(EthersContext);

export default EtherslProvider;
