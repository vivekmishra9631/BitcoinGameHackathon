/* eslint-disable @next/next/no-img-element */

import React from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Preloader,
  Fab,
  Link,
  Sheet,
  BlockTitle,
  Chip,
} from "konsta/react";

import { MdAdd } from "react-icons/md";
import Layout from "../Layout";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { shortenAddress } from "../../utils/shortenAddress";
import { readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import {
  PAYBRIDGE_ABI,
  PAYBRIDGE_MANAGER_ABI,
  PAYBRIDGE_MANAGER_ADDRESS,
} from "../../utils/contracts";
import axios from "axios";
import { useRouter } from "next/router";

export default function RegisterCompany() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Connect to the PayBridgeManager contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const payBridgeManagerContract = new ethers.Contract(
        contractData.PAYBRIDGE_MANAGER_ADDRESS,
        contractData.PAYBRIDGE_MANAGER_ABI,
        signer
      );

      // Call the registerCompany function
      const tx = await payBridgeManagerContract.registerCompany(companyName, companyDescription);
      await tx.wait();

      // Handle successful registration (e.g., redirect to company dashboard)
      router.push('/company-dashboard'); // Replace with your desired route
    } catch (error) {
      console.error(error);
      setError(error.message); // Set error state for display
    }
  };

  return (
    <Layout>
      <Navbar title="Company" />
    <div>
      <h2>Register Your Company</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <label htmlFor="companyDescription">Company Description:</label>
        <textarea
          id="companyDescription"
          value={companyDescription}
          onChange={(e) => setCompanyDescription(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
    </Layout>
  );
}