import useEth from "../../contexts/EthContext/useEth";

function EndVotingSession() {
  const { state: { contract, accounts, web3 } } = useEth();

  const endVotingSession = async () => {
    await contract.methods.endVotingSession().send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <button onClick={endVotingSession} className="startProposalRegistration-btn">
        EndVotingSession
      </button>
    </div>
  );
}

export default EndVotingSession;