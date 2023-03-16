import { useState, useEffect } from "react";
import useVoting from "../contexts/VotingContext/useVoting";

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
    <div>
      <input
        type="text"
        placeholder="proposalId"
        value={inputId}
        onChange={handleInputChange}
      />
      <button onClick={vote}>VoteForOneProposal</button>
      <div>
        {eventValues.voter && <p>Voter address: {eventValues.voter}</p>}
        {eventValues.proposalId && (
          <p>
            You have voted for the proposal number : {eventValues.proposalId}
          </p>
        )}
      </div>
    </div>
  );
}

export default Vote;
