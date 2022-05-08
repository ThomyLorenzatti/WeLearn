import React, { useEffect, useState } from "react";
import styles from "./metamask.css";
import axios from 'axios'
import { GiSleepy } from "react-icons/gi";

async function connect(onConnected) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    console.log("WOOOOOOOOOOOOW");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }
  }
}

export default function MetaMaskAuth({ onAddressChanged }) {
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  useEffect(() => {
    onAddressChanged(userAddress);
  }, [userAddress]);

  return userAddress ? (
    <Address userAddress={userAddress} />
  ) : (
     <Connect setUserAddress={setUserAddress}/>
  );
}


function Connect({ setUserAddress }) {
  return (
    <button class="button-metamask" onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}

async function Address(userAddress) {
  console.log(userAddress.userAddress);

  axios.get(
    `http://localhost:8080/wallet_info?wallet=${userAddress.userAddress}`
  )
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

  var nb_bnb = 2;
  var nb_lrn = 2;

  return (
    <>
      <span className="nav-tokens">
        {nb_lrn} LRN
      </span>
      <span className="nav-tokens">
        {nb_bnb}
        <img className="nav-tokens-img"
          src="./src/images/bnb.png"
          alt="BNB"      
          />
      </span>
    </>
  );
}