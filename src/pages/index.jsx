/* eslint-disable @next/next/no-img-element */
import { writeContract } from "@wagmi/core";
import axios from "axios";
import { ethers } from "ethers";
import {
  Block,
  BlockTitle,
  Button,
  Chip,
  Link,
  List,
  ListItem,
  Navbar,
  Notification,
  Page,
  Preloader,
  Sheet,
  Toast,
} from "konsta/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { config } from "../utils/config";
import {
  FUSE_PAY_MANAGER_ABI,
  FUSE_PAY_MANAGER_ADDRESS,
} from "../utils/contracts";
import { pushImgToStorage, putJSONandGetHash } from "../utils/ipfsGateway";
import Layout from "./Layout";
import { exampleQA } from "./api/promptGenerator";

export default function Home() {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });

  const [notificationWithButton, setNotificationWithButton] = useState(false);
  const [sheetOpened, setSheetOpened] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [inTxn, setInTxn] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [alertOpened, setAlertOpened] = useState(false);

  const [chatSheetOpened, setChatSheetOpened] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [showAnswer, setShowAnswer] = useState(null);

  const openNotification = (setter) => {
    setNotificationWithButton(false);
    setter(true);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 2 * 1024 * 1024; // 3MB in bytes

    if (file) {
      if (file.size > maxSize) {
        alert("File size exceeds the maximum allowed (3MB).");
        return;
      }

      setCompanyLogo(file);
      setShowToast(true);
    }
  };

  const createCompany = async () => {
    try {
      if (companyLogo && companyName && description) {
        setInTxn(true);

        const logoCID = await pushImgToStorage(companyLogo);
        const obj = {
          companyName: companyName,
          companyLogo: logoCID,
          companyDescription: description,
        };
        console.log("IMAGE INSERTED");
        // 0x763b9295081c8e04F444F44A1cF14D7379F579c2
        const companyCID = await putJSONandGetHash(obj, companyName);
        console.log("COMPANY INSERTED", companyCID);
        console.log(FUSE_PAY_MANAGER_ADDRESS);
        const { hash } = await writeContract({
          address: FUSE_PAY_MANAGER_ADDRESS,
          abi: FUSE_PAY_MANAGER_ABI,
          functionName: "createCompany",
          args: [companyCID],
        });

        if (hash) {
          openNotification(setNotificationWithButton);
          setInTxn(false);
          setSheetOpened(false);
        } else {
          setInTxn(false);
          setShowToast(false);
        }
      } else {
        setInTxn(false);
      }
    } catch (error) {
      console.log(error);
      alert(error);
      setInTxn(false);
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/chat", { message: chatInput });
      setChatResponse(response.data.text);
    } catch (error) {
      console.error("Error fetching chat response:", error);
    }
  };

  const toggleAnswer = (index) => {
    setShowAnswer(showAnswer === index ? null : index);
  };

  return (
    <>
      <Layout>
        <Navbar
          title={
            <span className="text-gray-900 dark:text-gray-100">PayBridge</span>
          }
        />
        <div className="h-full">
          <Notification
            opened={notificationWithButton}
            title="Creation Successfull"
            button
            onClick={() => setNotificationWithButton(false)}
            subtitle="Successfully created company space"
            text="Click (x) to close me"
          />

          <Toast
            position="center"
            opened={showToast}
            button={
              <Button
                rounded
                clear
                small
                inline
                onClick={() => setShowToast(false)}
              >
                Close
              </Button>
            }
          ></Toast>
          <section className="dark:bg-gradient-to-b from-blue-700/[4.79] via-gray-800 h-full">
            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
              <a
                href="https://rootstock.io"
                target="_blank"
                className="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full mb-7 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                role="alert"
              >
                <Chip
                  media={
                    <img
                      alt="rootstock"
                      className="ios:h-7 material:h-6 rounded-full"
                      src="/rootstock.jpg"
                    />
                  }
                  className="text-xs bg-black rounded-full text-white px-4 py-1.5 mr-3"
                ></Chip>{" "}
                <span className="text-sm font-bold ml-2 text-white">
                  Powered by Rootstock
                </span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a 1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-100">
                We Help manage your Companys Finance
              </h1>
              <p className="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-200">
                Here at PayBridge we focus on markets where AI technology,
                innovation, and capital can unlock long-term value and drive
                economic growth.
              </p>
              <div className="flex mb-8 align-center justify-center space-x-4 lg:mb-16 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <Link
                  onClick={() => setSheetOpened(true)}
                  className="inline-flex bg-blue-700 max-w-sm justify-center items-center gap-x-3 text-center shadow-2xl shadow-transparent hover:shadow-blue-700/70 border border-transparent text-white font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800 hover:text-gray-200"
                >
                  Register company
                  <svg
                    className="w-2.5 h-2.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
                <Link
                  className="max-w-sm inline-flex justify-center items-center gap-x-1 text-center bg-blue-700 shadow-2xl shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white font-bold text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800 mx-5 hover:text-gray-300"
                  href="/company"
                >
                  View company
                  <svg
                    className="w-2.5 h-2.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
                <Link
                  onClick={() => setChatSheetOpened(true)}
                  className="inline-flex bg-blue-700 max-w-sm justify-center items-center gap-x-3 text-center shadow-2xl shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:text-gray-100 dark:focus:ring-offset-gray-800 hover:text-gray-300"
                >
                  Open Chatbot
                  <svg
                    className="w-2.5 h-2.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
              <div className="lg:col-span-7">
                <div className="grid grid-cols-12 gap-2 sm:gap-6 items-center lg:-translate-x-10">
                  <div className="col-span-4">
                    <img
                      className="rounded-xl"
                      src={
                        "https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1981&q=80"
                      }
                      alt="Image Description"
                    />
                  </div>

                  <div className="col-span-3">
                    <img
                      className="rounded-xl"
                      src={
                        "https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                      }
                      alt="Image Description"
                    />
                  </div>

                  <div className="col-span-5">
                    <img
                      className="rounded-xl"
                      src="https://images.unsplash.com/photo-1600194992440-50b26e0a0309?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                      alt="Image Description"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5">
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-2 md:space-y-4">
                    <h2 className="font-bold text-3xl lg:text-4xl text-gray-300 dark:text-gray-200">
                      Kickstart Payrolls and Secure Work Loans Effortlessly
                    </h2>
                    <p className="text-gray-200">
                      Use our services to initiate payroll and transactions and
                      loan requests for your Team/ workers.
                    </p>
                  </div>

                  <ul role="list" className="space-y-2 sm:space-y-4">
                    <li className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-500"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z"
                          fill="currentColor"
                          fillOpacity="0.1"
                        />
                        <path
                          d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z"
                          fill="currentColor"
                        />
                      </svg>

                      <span className="text-sm sm:text-base text-gray-200">
                        <span className="font-bold">Low costs</span> – Covered
                        by Rootstock
                      </span>
                    </li>

                    <li className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-500"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z"
                          fill="currentColor"
                          fillOpacity="0.1"
                        />
                        <path
                          d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z"
                          fill="currentColor"
                        />
                      </svg>

                      <span className="text-sm sm:text-base text-gray-200">
                        Seamless and Innovative Tech
                      </span>
                    </li>

                    <li className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-500"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z"
                          fill="currentColor"
                          fillOpacity="0.1"
                        />
                        <path
                          d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z"
                          fill="currentColor"
                        />
                      </svg>

                      <span className="text-sm sm:text-base text-gray-200">
                        Scaling solutions{" "}
                        <span className="font-bold">
                          Improving Traditional systems
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Sheet
          className="pb-safe"
          opened={sheetOpened}
          onBackdropClick={() => setSheetOpened(false)}
        >
          <div className="relative p-4 w-full max-w-md max-h-full mb-15">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create a company workspace
                </h3>
                <button
                  onClick={(e) => {
                    setSheetOpened(false);
                  }}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company Name
                  </label>
                  <input
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
                    type="text"
                    name="text"
                    id="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="PayBridge"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    type="text"
                    name="text"
                    id="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="About PayBridge"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="default_size"
                  >
                    Company Logo
                  </label>
                  <input
                    onChange={handleUploadImage}
                    className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="default_size"
                    type="file"
                  />
                </div>

                {!inTxn ? (
                  <Button
                    onClick={createCompany}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create
                  </Button>
                ) : (
                  <Preloader className="center-item " />
                )}
              </div>
            </div>
          </div>
        </Sheet>
        <Sheet
          className="pb-safe fixed inset-0 bg-gray-800 text-white p-4 transition-transform transform"
          opened={chatSheetOpened}
          onBackdropClick={() => setChatSheetOpened(false)}
          style={{ width: "50%", height: "90%", zIndex: 60 }} // Adjusted size for the larger chat window
        >
          <div className="relative p-4 w-full h-full max-h-full mb-15 flex items-center justify-center">
            <div
              className="relative w-full h-full bg-white rounded-lg shadow dark:bg-gray-700"
              style={{ height: "98%", width: "98%" }}
            >
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Chat with BitBot 🤖
                </h3>
                <button
                  onClick={() => setChatSheetOpened(false)}
                  type="button"
                  className="text-gray-400 hover:text-gray-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div
                className="p-4 md:p-5 mt-4 overflow-y-auto overflow-hidden flex-1"
                style={{ paddingBottom: "5rem" }}
              >
                <form onSubmit={handleChatSubmit}>
                  <input
                    type="text"
                    name="chatInput"
                    id="chatInput"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
                    placeholder="Ask something..."
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full mt-2 bg-blue-500 hover:bg-blue-500 text-white font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 shadow-2xl shadow-transparent hover:shadow-blue-500/50 hover:text-white"
                  >
                    Send
                  </Button>
                </form>
                {chatResponse && (
                  <div className="mt-4 p-4 dark:bg-blue-900 rounded-lg flex-grow text-white">
                    <h4 className="font-bold">Response:</h4>
                    <p>{chatResponse}</p>
                  </div>
                )}
                <div
                  id="faq-container"
                  className="mt-4 p-4 bg-gray-700 overflow-auto rounded-lg flex-grow text-white"
                >
                  <h4 className="font-bold">FAQ:</h4>
                  {exampleQA.map((qa, index) => (
                    <div key={index} className="mt-2">
                      <button
                        className="bg-gray-600 text-white p-2 rounded-lg w-full text-left"
                        onClick={() => toggleAnswer(index)}
                      >
                        {qa.question}
                      </button>
                      {showAnswer === index && (
                        <div className="bg-gray-500 p-2 rounded-lg mt-2">
                          {qa.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Sheet>
      </Layout>
    </>
  );
}
