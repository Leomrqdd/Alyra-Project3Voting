import { useState, useEffect } from "react";
import useVoting from "../../contexts/VotingContext/useVoting";

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
    <div className="w-full flex justify-center mt-4">
      <div className="w-1/2 p-4 flex flex-col justify-center items-center">
        <button 
          className="bg-teal-500 px-7 border-transparent rounded-md cursor-pointer hover:bg-teal-700 mx-4 flex justify-center items-center py-4"
          onClick={handleClick}
        >
          <span className="text-white whitespace-nowrap">Click here to have the Winning Proposal</span>
        </button>
        <div className="text-center mt-4 whitespace-nowrap" >
          {showResults && workflowStatus == 5 && (
                <p className="text-3xl text-gray-600 mb-2 italic">
                <span className="text-3xl inline-block font-bold mr-2">🎉</span>
                The Winning Proposal ID is {results}
                </p>
          )}
          {showResults && workflowStatus != 5 && (
            <p className="text-gray-600 mb-2 italic">
              The Winning Proposal has not been determined yet. Please follow the Vote process and refresh the page.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Results;
