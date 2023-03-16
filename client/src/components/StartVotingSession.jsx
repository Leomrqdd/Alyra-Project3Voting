import useVoting from "../contexts/VotingContext/useVoting";

function StartVotingSession() {
  const {
    state: { contract, accounts, web3 },
  } = useVoting();

  const startVotingSession = async () => {
    await contract.methods.startVotingSession().send({ from: accounts[0] });
  };

  return (
    <div>
      <button
        onClick={startVotingSession}
        className="startProposalRegistration-btn"
      >
        StartVotingSession
      </button>
    </div>
  );
}

export default StartVotingSession;
