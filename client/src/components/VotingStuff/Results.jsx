import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";


function Results() {

    const { state: { contract, accounts, web3 } } = useEth();
    const [showResults, setShowResults] = useState(false);
    const [Results, setResults] = useState();
    const [ResultsProposal, setResultsProposal] = useState("");
    const [ResultsVotes, setResultsVotes] = useState();

  
    function handleClick() {
        setShowResults(true);
    }


    useEffect(() => {
        const getResults = async () => {
          const value = await contract.methods.winningProposalID().call({from : accounts[0]});
          setResults(value);

          const value2 = await contract.methods.getOneProposal(value).call({from : accounts[0]});
          const value3 = value2.description;
          setResultsProposal(value3);

          const value4 = value2.voteCount;
          setResultsVotes(value4);
        };
        getResults();
      }, [contract]);


    return (
      <div>
        <button onClick={handleClick} className="results-btn">
        Click Here to have the Winning Proposal
        </button>
        <div>
        {showResults && Results!=0 && <p>The Winning Proposal ID is {Results} which is {ResultsProposal} and it has {ResultsVotes} votes </p>}
        {showResults && Results==0 && <p>The Winning Proposal has not been determined yet. Please follow the Vote process and refresh the page. </p>}
        </div>

      </div>
    );
  }

  export default Results;



  