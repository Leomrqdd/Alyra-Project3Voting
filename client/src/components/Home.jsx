import { useState, useEffect } from "react";
import useVoting from "../contexts/VotingContext/useVoting";
import Admin from "./Admin";
import Voter from "./Voter";
import Viewer from "./Viewer";
import Navbar from "./UI/Navbar";

const Home = () => {
  const {
    state: { contract, accounts },
  } = useVoting();
  const [userType, setUserType] = useState("viewer");
  const [userAddress, setUserAddress] = useState("");
  const [web3Enabled, setWeb3Enabled] = useState(false);
  const [input, setInput] = useState(0);
  const [statusEventValue, setStatusEventValue] = useState();

  useEffect(() => {
    const checkUserType = async () => {
      if (contract && accounts) {
        const isOwner = await contract.methods
          .getOwner()
          .call({ from: accounts[0] });
        if (isOwner === accounts[0]) {
          setUserType("owner");
        } else {
          const isVoter = await contract.methods
            .getVoterBool(accounts[0])
            .call({ from: accounts[0] });
          if (isVoter) {
            setUserType("voter");
          } else {
            setUserType("viewer");
          }
        }
        setUserAddress(accounts[0]);
      }
    };
    checkUserType();
  }, [contract, accounts]);

  useEffect(() => {
    const checkWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          setWeb3Enabled(true);
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkWeb3();
  }, []);

  useEffect(() => {
    const fetchWorkflowStatus = async () => {
      if (contract) {
        const value = await contract.methods
          .workflowStatus()
          .call({ from: accounts[0] });
        console.log(value);
        setInput(value);
      }
    };
    fetchWorkflowStatus();
  }, [accounts, contract, input, statusEventValue]);

  useEffect(() => {
    (async function () {
      if (contract) {
        await contract.events
          .WorkflowStatusChange({ fromBlock: "earliest" })
          .on("data", (event) => {
            let status = event.returnValues.newStatus;
            setStatusEventValue(status);
          })
          .on("changed", (changed) => console.log(changed))
          .on("error", (err) => console.log(err))
          .on("connected", (str) => console.log(str));
      }
    })();
  }, [contract]);

  return (
    <div>
      <Navbar
        userType={userType}
        web3Enabled={web3Enabled}
        userAddress={userAddress}
        workflowStatus={input}
      />
      <div className="flex w-full justify-center items-center pt-10">
        <div className="w-full px-10">
          {userType === "owner" && web3Enabled && <Admin />}
          {userType === "voter" && web3Enabled && <Voter />}
          {userType === "viewer" && web3Enabled && <Viewer />}
        </div>
      </div>
    </div>
  );
};

export default Home;
