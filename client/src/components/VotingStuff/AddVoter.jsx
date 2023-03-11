import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function AddVoter() {
  const { state: { contract, accounts, web3} } = useEth();
  const [inputAddress, setInputAddress] = useState("");

  const handleAddressChange = e => {
    setInputAddress(e.target.value);
  };

  const addVoter = async () => {
    if (!web3.utils.isAddress(inputAddress)) {
      alert("invalid address")
    }
    await contract.methods.addVoter(inputAddress).send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <input
        type="text"
        placeholder="address"
        value={inputAddress}
        onChange={handleAddressChange}
      />
      <button onClick={addVoter} className="addVoter-btn">
        addVoter
      </button>
    </div>
  );
}

export default AddVoter;