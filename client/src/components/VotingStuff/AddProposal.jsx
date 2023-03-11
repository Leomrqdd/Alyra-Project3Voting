import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function AddProposal() {
  const { state: { contract, accounts, web3 } } = useEth();
  const [inputProposal, setInputProposal] = useState("");


  const handleInputChange = e => {
    setInputProposal(e.target.value);
  };

  const addProposal = async () => {
    await contract.methods.addProposal(inputProposal).send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <input
        type="text"
        placeholder="string"
        value={inputProposal}
        onChange={handleInputChange}
      />
      <button onClick={addProposal} className="addProposal-btn">
        AddOneProposal
      </button>
    </div>
  );
}

export default AddProposal;