import useEth from "../../contexts/EthContext/useEth";

function StartProposalRegistration() {
  const { state: { contract, accounts, web3 } } = useEth();

  const startProposalRegistration = async () => {
    await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <button onClick={startProposalRegistration} className="startProposalRegistration-btn">
        StartProposalRegistration
      </button>
    </div>
  );
}

export default StartProposalRegistration;