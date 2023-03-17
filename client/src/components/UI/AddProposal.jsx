import { useState, useEffect } from "react";
import useVoting from "../../contexts/VotingContext/useVoting";

function AddProposal() {
  const {
    state: { contract, accounts, web3 },
  } = useVoting();
  const [inputProposal, setInputProposal] = useState("");
  const [eventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState();

  const handleInputChange = (e) => {
    setInputProposal(e.target.value);
  };

  const addProposal = async () => {
    await contract.methods
      .addProposal(inputProposal)
      .send({ from: accounts[0] });
  };

  useEffect(() => {
    (async function () {
      let oldEvents = await contract.getPastEvents("ProposalRegistered", {
        fromBlock: 0,
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
  }, [contract]);

  return (
    <div className="w-full p-4" >
      <div>
        {oldEvents && (
        <span className="text-gray-600 mb-2 italic">
           Number of Proposals already added: {oldEvents.length}
        </span>
        )}
      </div>

      <div className="flex relative mt-2 rounded-md shadow-sm">
      <input
        type="text"
        placeholder="string"
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
        value={inputProposal}
        onChange={handleInputChange}
      />
      <button 
      className="bg-teal-500 px-7 border-transparent rounded-md cursor-pointer hover:bg-teal-700 mx-4 flex justify-center items-center"
      onClick={addProposal}
      >
      <span className="text-white whitespace-nowrap">Add Proposal</span>
      </button>
      </div>



      <div>
      {eventValue && (
        <div class="text-gray-600 mb-2 italic">
          Proposal Id added: {eventValue}
        </div>
)}        
      </div>

    </div>
  );
}

export default AddProposal;
