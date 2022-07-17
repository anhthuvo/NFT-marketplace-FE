import { useRouter } from 'next/router';
import { useEthers } from 'store/useEthers';

const withAuth = (WrappedComponent) => (props) => {
  if (typeof window !== 'undefined') {
    const Router = useRouter();
    const { account } = useEthers();

    if (!account) {
      Router.replace('/login');
      return <></>;
    }
    return <WrappedComponent {...props} />;
  }
  // If we are on server, return null
  return <></>;
};

export default withAuth;
