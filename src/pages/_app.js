// pages/index.js
import { useState, useEffect } from 'react';
import { providers } from 'ethers';
import { rLogin } from './rLogin'; // Assuming rLogin is in the same directory

export default function MyApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [disconnect, setDisconnect] = useState(null);
  const [address, setAddress] = useState('');

  const login = async () => {
    try {
      const { provider, disconnect } = await rLogin.connect();
      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner(0);
      const userAddress = await signer.getAddress();
      setDisconnect(disconnect);
      setAddress(userAddress);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await disconnect();
    setDisconnect(null);
    setAddress('');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <button onClick={login} disabled={isLoggedIn}>
        Login
      </button>
      <button onClick={logout} disabled={!isLoggedIn}>
        Logout
      </button>
      <p>{address}</p>
    </div>
  );
}
