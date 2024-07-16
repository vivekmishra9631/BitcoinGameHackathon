/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { readContract, waitForTransaction, writeContract } from "@wagmi/core";
import axios from "axios";
import { ethers } from "ethers";
import {
  Block,
  BlockTitle,
  Button,
  Card,
  Chip,
  Link,
  List,
  ListItem,
  Navbar,
  Page,
  Preloader,
  Sheet,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "konsta/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { FaMoneyCheckDollar, FaPeopleGroup } from "react-icons/fa6";
import { useAccount } from "wagmi";
import {
  PAYBRIDGE_ABI,
  PAYBRIDGE_MANAGER_ABI,
  PAYBRIDGE_MANAGER_ADDRESS,
  STAKER_ABI,
  USDT_ABI,
  USDT_CONTRACT_ADDRESS,
} from "../../utils/contracts";
import { shortenAddress } from "../../utils/shortenAddress";
import Layout from "../Layout";

const Index = () => {
  const { address } = useAccount();
  const [inTxn, setInTxn] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [reason, setReason] = useState("");
  const [userCompanies, setUserCompanies] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);
  const [adminCompanies, setAdminCompanies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [loanRequests, setLoanRequests] = useState([]);

  const stake = async () => {
    try {
      if (!stakeAmount) {
        alert("Please enter stake amount");
        console.log("Please enter stake amount");
        return;
      }

      setInTxn(true);

      // Convert stakeAmount to Wei

      const amount = stakeAmount;

      const { hash } = await writeContract({
        abi: STAKER_ABI,
        functionName: "stake",
        args: [amount],
      });

      const receipt = await waitForTransaction({ hash });
      if (!receipt) {
        console.log("Failed to request stake Amount");
        setInTxn(false);
        return;
      }
      console.log("Stake Amount requested successfull");
    } catch (error) {
      console.log(error);
      setInTxn(false);
    }
  };

  useEffect(() => {}, [address]);
  return (
    <Layout>
      <Navbar title="Staking" />

      <div className="m-5 p-5">
        <BlockTitle> Stake TRBTC </BlockTitle>

        <Block>
          <div class="max-w-sm mx-auto">
            <strong className="mb-8 pb-4">
              {" "}
              <h1>Current Reward Rate: 0.5 RBTC / TRBTC </h1>{" "}
            </strong>

            <div class="mb-5 mt-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stake Amount (TRBTC)
              </label>

              <input
                onChange={(e) => setStakeAmount(e.target.value)}
                type="text"
                id="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="100"
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Reward (RBTC)
              </label>
              <input
                value={"100 eth"}
                type="text"
                id="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="emergency"
                disabled
              />
            </div>

            {inTxn ? (
              <Preloader className="center-item mt-3" />
            ) : (
              <button
                onClick={stake}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Stake
              </button>
            )}
          </div>
        </Block>

        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      </div>
    </Layout>
  );
};

export default Index;
