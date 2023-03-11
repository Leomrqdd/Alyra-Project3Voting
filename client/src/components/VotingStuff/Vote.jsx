import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Vote() {
  const { state: { contract, accounts, web3 } } = useEth();
  const [inputId, setInputId] = useState("");


  const handleInputChange = e => {
    setInputId(e.target.value);
  };

  const vote = async () => {
    await contract.methods.setVote(inputId).send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <input
        type="text"
        placeholder="proposalId"
        value={inputId}
        onChange={handleInputChange}
      />
      <button onClick={vote} className="vote-btn">
        VoteForOneProposal
      </button>
    </div>
  );
}

export default Vote;