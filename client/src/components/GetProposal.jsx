import { useState, useEffect } from "react";
import useVoting from "../contexts/VotingContext/useVoting";

function GetProposal() {
  const {
    state: { contract, accounts, web3 },
  } = useVoting();
  const [inputId, setInputId] = useState("");
  const [proposal, setProposal] = useState(null);

  const handleInputChange = (e) => {
    setInputId(e.target.value);
  };

  const getProposal = async () => {
    const value = await contract.methods
      .getOneProposal(inputId)
      .call({ from: accounts[0] });
    setProposal(value);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="proposalId"
        value={inputId}
        onChange={handleInputChange}
      />
      <button onClick={getProposal}>GetOneProposal</button>
      {proposal && (
        <div>
          <p>Proposal Description: {proposal.description}</p>
          <p>Proposal VoteCount: {proposal.voteCount}</p>
        </div>
      )}
    </div>
  );
}

export default GetProposal;
