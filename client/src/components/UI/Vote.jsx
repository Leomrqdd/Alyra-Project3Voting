import { useState, useEffect } from "react";
import useVoting from "../../contexts/VotingContext/useVoting";

function Vote() {
  const {
    state: { contract, accounts, web3 },
  } = useVoting();
  const [inputId, setInputId] = useState("");
  const [eventValues, setEventValues] = useState({
    voter: null,
    proposalId: null,
  });
  const handleInputChange = (e) => {
    setInputId(e.target.value);
  };

  const vote = async () => {
    await contract.methods.setVote(inputId).send({ from: accounts[0] });
  };

  useEffect(() => {
    (async function () {
      await contract.events
        .Voted({ fromBlock: "earliest" })
        .on("data", (event) => {
          let lesevents1 = event.returnValues.voter;
          let lesevents2 = event.returnValues.proposalId;
          setEventValues({
            voter: lesevents1,
            proposalId: lesevents2,
          });
        })
        .on("changed", (changed) => console.log(changed))
        .on("error", (err) => console.log(err))
        .on("connected", (str) => console.log(str));
    })();
  }, [contract]);

  return (
    <div className="w-1/3 p-4" >
     <div className="flex relative mt-2 rounded-md shadow-sm">
      <input
        type="text"
        placeholder="proposalId"
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
        value={inputId}
        onChange={handleInputChange}
      />
      <button 
      className="bg-teal-500 px-7 border-transparent rounded-md cursor-pointer hover:bg-teal-700 mx-4 flex justify-center items-center"
      onClick={vote}
      >
      <span className="text-white">Vote</span>
      </button>
      </div>

      <div className="text-gray-600 mb-2 italic whitespace-nowrap">
        {eventValues.voter && <p>Voter address: {eventValues.voter}</p>}
        {eventValues.proposalId && (
          <p>
            You have voted for the proposal number : {eventValues.proposalId} 😎
          </p>
        )}
    </div>
    </div>

  );
}

export default Vote;

