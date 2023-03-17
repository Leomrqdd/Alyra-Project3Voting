import useEth from "../../contexts/EthContext/useEth";

function EndProposalRegistration() {
  const { state: { contract, accounts, web3 } } = useEth();

  const endProposalRegistration = async () => {
    await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <button onClick={endProposalRegistration} className="endProposalRegistration-btn">
        EndProposalRegistration
      </button>
    </div>
  );
}

export default EndProposalRegistration;