import { useState, useEffect } from "react";
import useVoting from "../../contexts/VotingContext/useVoting";

function ProposalsList() {
  const {
    state: { contract, accounts, web3, txhash },
  } = useVoting();
  const [inputId, setInputId] = useState("");
  const [proposal, setProposal] = useState(null);
  const [oldEvents, setOldEvents] = useState([]);
  const [eventValue, setEventValue] = useState("");


  const handleInputChange = (e) => {
    setInputId(e.target.value);
  };

  const getProposal = async () => {
    const value = await contract.methods
      .getOneProposal(inputId)
      .call({ from: accounts[0] });
    setProposal(value);
  };

  useEffect(() => {
    (async function () {
      const deployTx = await web3.eth.getTransaction(txhash)
      let oldEvents = await contract.getPastEvents("ProposalRegistered", {
        fromBlock: deployTx.blockNumber,
        toBlock: "latest",
      });
      let oldies = [];
      oldEvents.forEach((event) => {
        oldies.push(event.returnValues.proposalId);
      });
      setOldEvents(oldies);

      await contract.events
        .ProposalRegistered({ fromBlock: "earliest" })
        .on("data", (event) => {
          let lesevents = event.returnValues.proposalId;
          setEventValue(lesevents);
        })
        .on("changed", (changed) => console.log(changed))
        .on("error", (err) => console.log(err))
        .on("connected", (str) => console.log(str));
    })();
  }, [contract,eventValue]);


  return (
    <div className="w-full p-4" >
      <p className="text-gray-600 mb-2 italic">For the moment, there are {oldEvents.length} proposals registered by all the Voters. Do not forget that the Id starts at 0 for the GENESIS proposal ! </p>
      <div className="flex relative mt-2 rounded-md shadow-sm">
      <input
        type="number"
        placeholder="proposalId"
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
        value={inputId}
        onChange={handleInputChange}
      />
      <button 
      className="bg-teal-500 px-7 border-transparent rounded-md cursor-pointer hover:bg-teal-700 mx-4 flex justify-center items-center"
      onClick={getProposal}
      >
      <span className="text-white whitespace-nowrap">Get Proposal</span>
      </button>
      </div>


      {proposal && (
        <div className="text-gray-600 mb-2 italic">
          <p >Proposal Description: {proposal.description}</p>
          <p>Proposal VoteCount: {proposal.voteCount}</p>
        </div>
      )}
    </div>
  );
}

export default ProposalsList;
