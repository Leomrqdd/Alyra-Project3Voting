import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";



function Workflow() {
    const {state : {accounts,contract}} = useEth();
    const [input, setInput] = useState(null);
    

    useEffect(() => {
        const fetchWorkflowStatus =async() => {
            const value = await contract.methods.workflowStatus().call({from : accounts[0]});
            setInput(value);

        };
        fetchWorkflowStatus();
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
    

    return (
        <div className="Workflow">
            The current Status of the Vote is : {voteStatusMessage}
        </div>
        );
};


export default Workflow;