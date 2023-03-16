import { useState, useEffect } from "react";
import useVoting from "../contexts/VotingContext/useVoting";

function Results() {
  const {
    state: { contract, accounts, web3 },
  } = useVoting();
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState();
  const [workflowStatus, setWorkflowStatus] = useState(null);

  function handleClick() {
    setShowResults(true);
  }

  useEffect(() => {
    const getResults = async () => {
      if (contract) {
        const value = await contract.methods
          .winningProposalID()
          .call({ from: accounts[0] });
        setResults(value);

        const workflow = await contract.methods
          .workflowStatus()
          .call({ from: accounts[0] });
        setWorkflowStatus(workflow);
      }
    };
    getResults();
  }, [contract]);

  return (
    <div>
      <button onClick={handleClick}>
        Click Here to have the Winning Proposal
      </button>
      <div>
        {showResults && workflowStatus === 5 && (
          <p>The Winning Proposal ID is {results} </p>
        )}
        {showResults && workflowStatus !== 5 && (
          <p>
            The Winning Proposal has not been determined yet. Please follow the
            Vote process and refresh the page.{" "}
          </p>
        )}
      </div>
    </div>
  );
}

export default Results;
