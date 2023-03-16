import useVoting from "../contexts/VotingContext/useVoting";
import { useState, useEffect } from "react";

function Workflow() {
  const {
    state: { accounts, contract },
  } = useVoting();
  const [input, setInput] = useState();
  const [eventValue, setEventValue] = useState();

  useEffect(() => {
    const fetchWorkflowStatus = async () => {
      if (contract) {
        const value = await contract.methods
          .workflowStatus()
          .call({ from: accounts[0] });
        setInput(value);
      }
    };
    fetchWorkflowStatus();
  }, [accounts, contract, input, eventValue]);

  useEffect(() => {
    (async function () {
      if (contract) {
        await contract.events
          .WorkflowStatusChange({ fromBlock: "earliest" })
          .on("data", (event) => {
            let lesevents = event.returnValues.newStatus;
            setEventValue(lesevents);
          })
          .on("changed", (changed) => console.log(changed))
          .on("error", (err) => console.log(err))
          .on("connected", (str) => console.log(str));
      }
    })();
  }, [contract]);

  let voteStatusMessage;

  switch (input) {
    case "0":
      voteStatusMessage = "Voters registration is in progress";
      break;
    case "1":
      voteStatusMessage = "Proposals registration is open";
      break;
    case "2":
      voteStatusMessage = "Proposals registration is closed";
      break;
    case "3":
      voteStatusMessage = "Voting session is in progress";
      break;
    case "4":
      voteStatusMessage = "Voting session is closed";
      break;
    case "5":
      voteStatusMessage = "Votes have been tallied";
      break;
    default:
      voteStatusMessage = "Unknown workflow status";
  }

  return <div>The current Status of the Vote is : {voteStatusMessage}</div>;
}

export default Workflow;
