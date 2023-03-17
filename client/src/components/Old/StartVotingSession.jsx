import useEth from "../../contexts/EthContext/useEth";

function StartVotingSession() {
  const { state: { contract, accounts, web3 } } = useEth();

  const startVotingSession = async () => {
    await contract.methods.startVotingSession().send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <button onClick={startVotingSession} className="startProposalRegistration-btn">
        StartVotingSession
      </button>
    </div>
  );
}

export default StartVotingSession;