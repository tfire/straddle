import { Link } from "@chakra-ui/react";
import { useDisconnect } from "@lido-sdk/web3-react";

export function DisconnectWallet(props) {
  const { disconnect } = useDisconnect();

  return (
    <Link
      fontWeight="400"
      fontSize="0.875rem"
      lineHeight="1rem"
      onClick={() => disconnect()}
      {...props}
    >
      Disconnect Wallet
    </Link>
  );
}