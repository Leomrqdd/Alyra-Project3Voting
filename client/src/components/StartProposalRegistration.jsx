import useVoting from "../contexts/VotingContext/useVoting";

function StartProposalRegistration() {
  const {
    state: { contract, accounts, web3 },
  } = useVoting();

  const startProposalRegistration = async () => {
    await contract.methods
      .startProposalsRegistering()
      .send({ from: accounts[0] });
  };

  return (
    <div>
      <button
        onClick={startProposalRegistration}
        className="startProposalRegistration-btn"
      >
        StartProposalRegistration
      </button>
    </div>
  );
}

export default StartProposalRegistration;
