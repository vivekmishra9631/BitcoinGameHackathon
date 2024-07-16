// pages/index.js
import { useState, useEffect } from 'react';
import { providers } from 'ethers';
import { rLogin } from './rLogin'; // Assuming rLogin is in the same directory

export default function MyApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [disconnect, setDisconnect] = useState(null);
  const [address, setAddress] = useState('');

  const login = () => {
    rLogin
      .connect()
      .then(({ provider, disconnect }) => {
        const web3Provider = new providers.Web3Provider(provider);
        const signer = web3Provider.getSigner(0);
        setDisconnect(disconnect);
        signer.getAddress().then(setAddress);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  };

  const logout = async () => {
    await disconnect;
    setDisconnect(null);
    setAddress('');
    setIsLoggedIn(false);
  };

  return (
    <div className="MyApp">
      <button onClick={login} disabled={isLoggedIn}>
        login
      </button>
      <button onClick={logout} disabled={!isLoggedIn}>
        logout
      </button>
      <p>{address}</p>
    </div>
  );
}
